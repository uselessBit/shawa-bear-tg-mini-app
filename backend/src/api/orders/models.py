from datetime import datetime

from sqlalchemy import DateTime, Float, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.database import Base


class Order(Base):
    __tablename__ = "orders"

    order_id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    basket_id: Mapped[int] = mapped_column(ForeignKey("baskets.basket_id"), nullable=False)
    order_date: Mapped[datetime] = mapped_column(DateTime, nullable=False, default=datetime.utcnow)
    total_price: Mapped[float] = mapped_column(Float, nullable=False)

    basket: Mapped["Basket"] = relationship("Basket", back_populates="orders")
