from datetime import datetime

from sqlalchemy import Column, DateTime, Enum, Float, Integer, String

from app.database.database import Base
from enum import Enum as PyEnum


class OrderStatus(str, PyEnum):
    PLACED = "PLACED"
    CONFIRMED = "CONFIRMED"
    PREPARING = "PREPARING"
    READY = "READY"
    PICKED_UP = "PICKED_UP"


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)

    customer_name = Column(String, nullable=False)

    total_price = Column(Float, nullable=False)

    status = Column(
        Enum(OrderStatus),
        default=OrderStatus.PLACED,
        nullable=False,
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
    )