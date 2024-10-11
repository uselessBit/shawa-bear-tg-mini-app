from sqlalchemy import Column, Integer, ForeignKey, Float
from sqlalchemy.orm import relationship, mapped_column, Mapped
from src.database import Base

class Basket(Base):
    __tablename__ = 'basket'

    basket_id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey('users.user_id'))
    product_id: Mapped[int] = mapped_column(ForeignKey('products.product_id'))
    quantity: Mapped[int] = mapped_column(nullable=False, default=1)
    total_price: Mapped[float] = mapped_column(nullable=True)

    product: Mapped["Product"] = relationship(back_populates="basket")
    user: Mapped["User"] = relationship(back_populates="basket")
