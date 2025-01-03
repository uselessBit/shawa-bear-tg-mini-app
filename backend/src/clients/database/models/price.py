from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.clients.database.base import Base


class Price(Base):
    __tablename__ = "prices"

    price_id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    size_id: Mapped[int] = mapped_column(ForeignKey("sizes.size_id"))
    product_id: Mapped[int] = mapped_column(ForeignKey("products.product_id"))
    price: Mapped[float] = mapped_column(nullable=False)

    product: Mapped["Product"] = relationship(back_populates="prices")
    size: Mapped["Size"] = relationship(back_populates="prices")
    basket_items: Mapped[list["BasketItem"]] = relationship("BasketItem", back_populates="price")
