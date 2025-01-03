from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.clients.database.base import Base


class Size(Base):
    __tablename__ = "sizes"

    size_id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(30), nullable=False, unique=True)
    grams: Mapped[int] = mapped_column(nullable=False)

    prices: Mapped[list["Price"]] = relationship(back_populates="size")
