from sqlalchemy import Column, Integer, ForeignKey, Float
from sqlalchemy.orm import relationship, mapped_column, Mapped
from src.database import Base

class Basket(Base):
    __tablename__ = "baskets"

    basket_id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey('users.user_id'))

    user: Mapped["User"] = relationship(back_populates="basket")
    basket_items: Mapped[list["BasketItem"]] = relationship(back_populates="basket")

class BasketItem(Base):
    __tablename__ = "basket_items"

    basket_item_id: Mapped[int] = mapped_column(primary_key=True)
    basket_id: Mapped[int] = mapped_column(ForeignKey("baskets.basket_id"))
    price_id: Mapped[int] = mapped_column(ForeignKey("users.user_id"))
    quantity: Mapped[int] = mapped_column(nullable=False, default=1)

    price: Mapped["Price"] = relationship(back_populates="basket_item")
    basket: Mapped["Basket"] = relationship(back_populates="basket_item")
