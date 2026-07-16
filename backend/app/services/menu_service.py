from sqlalchemy.orm import Session
from app.models.menu import MenuItem
from app.schemas.menu import MenuCreate


def create_menu(db: Session, menu: MenuCreate):
    db_menu = MenuItem(**menu.model_dump())

    db.add(db_menu)
    db.commit()
    db.refresh(db_menu)

    return db_menu


def get_all_menu(db: Session):
    return db.query(MenuItem).all()


def get_menu_by_id(db: Session, menu_id: int):
    return db.query(MenuItem).filter(MenuItem.id == menu_id).first()

def update_menu(db: Session, menu_id: int, updated_menu: MenuUpdate):
    menu = db.query(MenuItem).filter(MenuItem.id == menu_id).first()

    if not menu:
        raise HTTPException(status_code=404, detail="Menu item not found")

    for key, value in updated_menu.model_dump().items():
        setattr(menu, key, value)

    db.commit()
    db.refresh(menu)

    return menu


def delete_menu(db: Session, menu_id: int):
    menu = db.query(MenuItem).filter(MenuItem.id == menu_id).first()

    if not menu:
        raise HTTPException(status_code=404, detail="Menu item not found")

    db.delete(menu)
    db.commit()

    return {"message": "Menu item deleted successfully"}


def toggle_availability(db: Session, menu_id: int):
    menu = db.query(MenuItem).filter(MenuItem.id == menu_id).first()

    if not menu:
        raise HTTPException(status_code=404, detail="Menu item not found")

    menu.is_available = not menu.is_available

    db.commit()
    db.refresh(menu)

    return menu