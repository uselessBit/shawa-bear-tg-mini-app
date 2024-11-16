from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.database import Base


class Basket(Base):
    __tablename__ = "baskets"

    basket_id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(nullable=False)

    items: Mapped[list["BasketItem"]] = relationship(
        "BasketItem", back_populates="basket"
    )


class BasketItem(Base):
    __tablename__ = "basket_items"

    basket_item_id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    basket_id: Mapped[int] = mapped_column(
        ForeignKey("baskets.basket_id"), nullable=False
    )
    price_id: Mapped[int] = mapped_column(ForeignKey("prices.price_id"), nullable=False)
    quantity: Mapped[int] = mapped_column(nullable=False, default=1)

    basket: Mapped["Basket"] = relationship("Basket", back_populates="items")
    price: Mapped["Price"] = relationship("Price", back_populates="basket_items")
