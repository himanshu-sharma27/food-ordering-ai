from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.order import OrderCreate, OrderResponse, OrderStatusUpdate
from app.services.order_service import (
    create_order,
    get_all_orders,
    get_order,
    update_order_status,
    
)

router = APIRouter(
    prefix="/orders",
    tags=["Orders"],
)


@router.post("/", response_model=OrderResponse)
def place_order(
    order: OrderCreate,
    db: Session = Depends(get_db),
):
    return create_order(db, order)


@router.get("/", response_model=list[OrderResponse])
def all_orders(
    db: Session = Depends(get_db),
):
    return get_all_orders(db)


@router.get("/{order_id}", response_model=OrderResponse)
def single_order(
    order_id: int,
    db: Session = Depends(get_db),
):
    return get_order(db, order_id)

@router.patch("/{order_id}", response_model=OrderResponse)
def update_status(
    order_id: int,
    order: OrderStatusUpdate,
    db: Session = Depends(get_db),
):
    return update_order_status(
        db,
        order_id,
        order,
    )