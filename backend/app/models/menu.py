from sqlalchemy import Boolean, Column, Float, Integer, String

from app.database.database import Base


class MenuItem(Base):
    __tablename__ = "menu_items"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    description = Column(String)

    category = Column(String)

    price = Column(Float, nullable=False)

    is_veg = Column(Boolean, default=False)

    is_spicy = Column(Boolean, default=False)

    is_available = Column(Boolean, default=True)

    image_url = Column(String, nullable=True)

    embedding = Column(String, nullable=True)