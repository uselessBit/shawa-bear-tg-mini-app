from sqlalchemy import (Boolean, Column, DateTime, ForeignKey, Integer, String,
                        Text)
from sqlalchemy.orm import Mapped, relationship

from src.db import Base


class User(Base):
    __tablename__ = 'users'
    __table_args__ = {'extend_existing': True}

    user_id = Column(Integer, primary_key=True, autoincrement=True)
    first_name: Mapped[str] = Column(String(50), nullable=False)
    last_name: Mapped[str] = Column(String(50), nullable=False)
    email: str = Column(String(100), nullable=False, unique=True)
    hashed_password = Column(Text, nullable=False)
    is_active = Column(Boolean, default=True)
    is_admin = Column(Boolean, default=False)

