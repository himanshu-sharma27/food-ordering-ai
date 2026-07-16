from pydantic import BaseModel, Field


class OrderItemCreate(BaseModel):
    menu_item_id: int
    quantity: int = Field(gt=0)


class OrderCreate(BaseModel):
    customer_name: str
    items: list[OrderItemCreate]


class OrderStatusUpdate(BaseModel):
    status: str


class OrderResponse(BaseModel):
    id: int
    customer_name: str
    total_price: float
    status: str

    class Config:
        from_attributes = True