from datetime import datetime

from sqlalchemy import DateTime, Float, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.clients.database.base import Base


class Order(Base):
    __tablename__ = "orders"

    order_id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    basket_id: Mapped[int] = mapped_column(ForeignKey("baskets.basket_id", ondelete="CASCADE"), nullable=False)
    order_date: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False, default=datetime.utcnow)
    total_price: Mapped[float] = mapped_column(Float, nullable=False)
    payment_option: Mapped[str] = mapped_column(String(50), nullable=False, default="сard")
    time_taken: Mapped[str] = mapped_column(String(50), nullable=False)
    comment: Mapped[str] = mapped_column(nullable=True)
    status: Mapped[str] = mapped_column(String(50), nullable=False, default="created")

    basket: Mapped["Basket"] = relationship("Basket", back_populates="orders")  # noqa: F821
