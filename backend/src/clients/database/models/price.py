from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.clients.database.base import Base


class Price(Base):
    __tablename__ = "prices"

    price_id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    size_id: Mapped[int] = mapped_column(ForeignKey("sizes.size_id", ondelete="CASCADE"))
    product_id: Mapped[int] = mapped_column(ForeignKey("products.product_id", ondelete="CASCADE"))
    price: Mapped[float] = mapped_column(nullable=False)

    product: Mapped["Product"] = relationship(back_populates="prices")  # noqa: F821
    size: Mapped["Size"] = relationship(back_populates="prices")  # noqa: F821
    basket_items: Mapped[list["BasketItem"]] = relationship("BasketItem", back_populates="price", cascade="all, delete-orphan")  # noqa: F821
