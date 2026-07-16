from pydantic import BaseModel, Field
from typing import Optional




class MenuBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    description: Optional[str] = None
    category: str
    price: float = Field(..., gt=0)
    is_veg: bool = False
    is_spicy: bool = False
    is_available: bool = True
    image_url: Optional[str] = None


class MenuCreate(MenuBase):
    pass


class MenuUpdate(MenuBase):
    pass


class MenuResponse(MenuBase):
    id: int

    class Config:
        from_attributes = True