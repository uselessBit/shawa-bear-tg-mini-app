"""add time zone

Revision ID: 8152e2f1060a
Revises: 52948f2fc9da
Create Date: 2024-12-30 13:57:03.837967

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = '8152e2f1060a'
down_revision: Union[str, None] = '52948f2fc9da'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    op.alter_column(
        'orders',
        'order_date',
        type_=sa.DateTime(timezone=True),
        existing_type=sa.DateTime(timezone=False),
    )

def downgrade():
    op.alter_column(
        'orders',
        'order_date',
        type_=sa.DateTime(timezone=False),
        existing_type=sa.DateTime(timezone=True),
    )
    # ### end Alembic commands ###
