from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.search import SearchRequest
from app.ai.search_service import semantic_search
from app.models.menu import MenuItem

router = APIRouter(
    prefix="/search",
    tags=["AI Search"]
)


@router.post("/")
def search_menu(
    request: SearchRequest,
    db: Session = Depends(get_db)
):
    menu_items = db.query(MenuItem).all()

    results = semantic_search(
        menu_items,
        request.query
    )

    response = []

    for result in results:
        item = result["item"]

        response.append(
            {
                "id": item.id,
                "name": item.name,
                "description": item.description,
                "category": item.category,
                "price": item.price,
                "similarity": round(result["score"], 3)
            }
        )

    return response