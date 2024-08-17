from sqlalchemy import (Boolean, Column, DateTime, ForeignKey, Integer, String,
                        Text)
from sqlalchemy.orm import Mapped, relationship, mapped_column

from src.db import Base


class Product(Base):
    __tablename__ = 'products'
    __table_args__ = {'extend_existing': True}

    product_id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(30), nullable=False)
    description: Mapped[str] = mapped_column(nullable=False)
    price: Mapped[int] = mapped_column(nullable=False)

