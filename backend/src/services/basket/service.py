from sqlalchemy import select
from sqlalchemy.orm import joinedload

from src.clients.database.models.basket import Basket, BasketItem, BasketItemExcludedIngredient
from src.clients.database.models.ingredient import Ingredient
from src.clients.database.models.price import Price
from src.services.base import BaseService
from src.services.basket.interface import BasketServiceI
from src.services.basket.schemas import BasketItemCreate, BasketItemResponse, BasketResponse, QuantityUpdate
from src.services.errors import BasketItemNotFoundError, BasketNotFoundError, PriceNotFoundError, \
    IngredientNotFoundError


class BasketService(BaseService, BasketServiceI):
    async def get_user_basket(self, user_id: int) -> BasketResponse:
        async with self.session() as session:
            query = select(Basket).where(Basket.user_id == user_id).options(
                joinedload(Basket.items).joinedload(BasketItem.price),
                joinedload(Basket.items).joinedload(BasketItem.excluded_ingredients)
            )
            result = await session.execute(query)
            basket = result.unique().scalar_one_or_none()
            if not basket:
                raise BasketNotFoundError

            total_price = sum(
                item.quantity * item.price.price
                for item in basket.items
            ) if basket else 0.0

        return BasketResponse(
            basket_id=basket.basket_id,
            user_id=basket.user_id,
            total_price=total_price,
            items=[
                BasketItemResponse(
                    basket_item_id=item.basket_item_id,
                    price_id=item.price_id,
                    quantity=item.quantity,
                    excluded_ingredient_ids=[ing.ingredient_id for ing in item.excluded_ingredients]
                )
                for item in basket.items
            ],
        )

    async def add_item(self, user_id: int, item_data: BasketItemCreate) -> None:
        async with self.session() as session, session.begin():
            query = select(Basket).where(Basket.user_id == user_id)
            result = await session.execute(query)
            basket = result.scalar()

            if not basket:
                basket = Basket(user_id=user_id)
                session.add(basket)
                await session.flush()

            if not await session.get(Price, item_data.price_id):
                raise PriceNotFoundError

            if item_data.excluded_ingredient_ids:
                stmt = select(Ingredient).where(Ingredient.ingredient_id.in_(item_data.excluded_ingredient_ids))
                result = await session.execute(stmt)
                existing_ingredients = list(result.scalars().all())
                if len(existing_ingredients) != len(item_data.excluded_ingredient_ids):
                    raise IngredientNotFoundError
            else:
                existing_ingredients = []

            existing_item = await self._get_existing_item(session, basket, item_data)

            if existing_item:
                existing_item.quantity += item_data.quantity
            else:
                new_item = BasketItem(
                    basket_id=basket.basket_id,
                    price_id=item_data.price_id,
                    quantity=item_data.quantity,
                )
                session.add(new_item)
                await session.flush()

                if existing_ingredients:
                    excluded = [
                        BasketItemExcludedIngredient(
                            basket_item_id=new_item.basket_item_id,
                            ingredient_id=ing.ingredient_id
                        )
                        for ing in existing_ingredients
                    ]
                    session.add_all(excluded)
                    await session.flush()

    @staticmethod
    async def _get_existing_item(session, basket: Basket, item_data: BasketItemCreate):
        query = select(BasketItem).where(BasketItem.basket_id == basket.basket_id, BasketItem.price_id == item_data.price_id).options(joinedload(BasketItem.excluded_ingredients))
        result = await session.execute(query)
        candidates = result.scalars().all()

        target_excluded = set(item_data.excluded_ingredient_ids)

        for candidate in candidates:
            candidate_excluded = {ing.ingredient_id for ing in candidate.excluded_ingredients}
            if candidate_excluded == target_excluded:
                return candidate

        return None

    async def remove_item(self, basket_item_id: int) -> None:
        async with self.session() as session, session.begin():
            query = select(BasketItem).where(BasketItem.basket_item_id == basket_item_id)
            result = await session.execute(query)
            item = result.scalar()

            if not item:
                raise BasketItemNotFoundError

            await session.delete(item)

    async def clear_basket(self, basket_id: int) -> None:
        async with self.session() as session, session.begin():
            query = select(BasketItem).where(BasketItem.basket_id == basket_id)
            result = await session.execute(query)
            items_to_delete = result.scalars().unique().all()

            if not items_to_delete:
                raise BasketNotFoundError

            for item in items_to_delete:
                await session.delete(item)

    async def change_quantity(self, quantity_update: QuantityUpdate) -> None:
        async with self.session() as session, session.begin():
            query = select(BasketItem).where(BasketItem.basket_item_id == quantity_update.basket_item_id)
            result = await session.execute(query)
            item = result.scalar()

            if not item:
                raise BasketItemNotFoundError

            item.quantity = quantity_update.quantity
