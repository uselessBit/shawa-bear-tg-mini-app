from src.clients.database.base import Base
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

class Ingredient(Base):
    __tablename__ = "ingredients"

    ingredient_id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(50), nullable=False, unique=True)
    image_url: Mapped[str] = mapped_column(nullable=True)

    products: Mapped[list["Product"]] = relationship(back_populates="ingredients", secondary="product_ingredient")