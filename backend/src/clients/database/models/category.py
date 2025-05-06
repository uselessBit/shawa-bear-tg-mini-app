from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.clients.database.base import Base


class Category(Base):
    __tablename__ = "categories"

    category_id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(30), nullable=False, unique=True)

    products: Mapped[list["Product"]] = relationship(back_populates="category", cascade="all, delete-orphan")  # noqa: F821


