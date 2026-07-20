from datetime import date

from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.menu import MenuItem


def get_dashboard(db: Session):

    orders_by_status = {}

    statuses = db.query(
        Order.status,
        func.count(Order.id)
    ).group_by(Order.status).all()

    for status, count in statuses:
        orders_by_status[str(status)] = count

    revenue = db.query(
    func.sum(Order.total_price)
).scalar() or 0

    popular_items = (
        db.query(
            MenuItem.name,
            func.sum(OrderItem.quantity).label("total")
        )
        .join(
            OrderItem,
            MenuItem.id == OrderItem.menu_item_id
        )
        .group_by(MenuItem.name)
        .order_by(func.sum(OrderItem.quantity).desc())
        .limit(5)
        .all()
    )

    total_orders = db.query(func.count(Order.id)).scalar() or 0

    return {
    "today_revenue": revenue,
    "total_orders": total_orders,
    "orders_by_status": orders_by_status,
    "popular_items": [
        {
            "name": item.name,
            "orders": item.total
        }
        for item in popular_items
    ]
}