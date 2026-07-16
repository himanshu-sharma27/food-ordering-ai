from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.menu import MenuCreate, MenuResponse
from app.schemas.menu import MenuCreate, MenuUpdate, MenuResponse

from app.services.menu_service import (
    create_menu,
    get_all_menu,
    get_menu_by_id,
    update_menu,
    delete_menu,
    toggle_availability,
)

router = APIRouter(
    prefix="/menu",
    tags=["Menu"],
)


@router.post("/", response_model=MenuResponse)
def add_menu(menu: MenuCreate, db: Session = Depends(get_db)):
    return create_menu(db, menu)


@router.get("/", response_model=list[MenuResponse])
def get_menu(db: Session = Depends(get_db)):
    return get_all_menu(db)


@router.get("/{menu_id}", response_model=MenuResponse)
def get_single_menu(menu_id: int, db: Session = Depends(get_db)):
    return get_menu_by_id(db, menu_id)

@router.put("/{menu_id}", response_model=MenuResponse)
def edit_menu(
    menu_id: int,
    menu: MenuUpdate,
    db: Session = Depends(get_db)
):
    return update_menu(db, menu_id, menu)


@router.delete("/{menu_id}")
def remove_menu(
    menu_id: int,
    db: Session = Depends(get_db)
):
    return delete_menu(db, menu_id)


@router.patch("/{menu_id}/availability", response_model=MenuResponse)
def change_availability(
    menu_id: int,
    db: Session = Depends(get_db)
):
    return toggle_availability(db, menu_id)