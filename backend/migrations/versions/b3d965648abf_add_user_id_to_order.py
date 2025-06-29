"""add_user_id_to_order

Revision ID: b3d965648abf
Revises: 735deaa7b8d7
Create Date: 2025-05-31 01:12:40.821880

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'b3d965648abf'
down_revision: Union[str, None] = '735deaa7b8d7'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('orders', sa.Column('user_id', sa.Integer(), nullable=False))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('orders', 'user_id')
    # ### end Alembic commands ###
