from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from src.db import Base


class User(Base):
    __tablename__ = 'users'
    __table_args__ = {'extend_existing': True}

    user_id: Mapped[int] = mapped_column(primary_key=True, autoincrement=False)
    first_name: Mapped[str] = mapped_column()
    last_name: Mapped[str] = mapped_column()
    username: Mapped[str] = mapped_column()
    language_code: Mapped[str] = mapped_column()

