from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.menu import MenuItem
from app.models.order import Order
from app.models.order_item import OrderItem
from app.schemas.order import OrderCreate
from app.schemas.order import OrderStatusUpdate


def create_order(db: Session, order: OrderCreate):

    total = 0

    db_order = Order(
        customer_name=order.customer_name,
        total_price=0
    )

    db.add(db_order)
    db.commit()
    db.refresh(db_order)

    for item in order.items:

        menu_item = db.query(MenuItem).filter(
            MenuItem.id == item.menu_item_id
        ).first()

        if not menu_item:
            raise HTTPException(
                status_code=404,
                detail=f"Menu item {item.menu_item_id} not found"
            )

        total += menu_item.price * item.quantity

        db_item = OrderItem(
            order_id=db_order.id,
            menu_item_id=item.menu_item_id,
            quantity=item.quantity
        )

        db.add(db_item)

    db_order.total_price = total

    db.commit()
    db.refresh(db_order)

    return db_order


def get_all_orders(db: Session):
    return db.query(Order).all()


def get_order(db: Session, order_id: int):

    order = db.query(Order).filter(
        Order.id == order_id
    ).first()

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    return order

def update_order_status(
    db: Session,
    order_id: int,
    order_update: OrderStatusUpdate
):

    order = db.query(Order).filter(
        Order.id == order_id
    ).first()

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    valid_statuses = [
        "PLACED",
        "PREPARING",
        "OUT_FOR_DELIVERY",
        "DELIVERED"
    ]

    if order_update.status not in valid_statuses:
        raise HTTPException(
            status_code=400,
            detail="Invalid order status"
        )

    order.status = order_update.status

    db.commit()
    db.refresh(order)

    return order