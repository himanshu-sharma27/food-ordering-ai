from pydantic import BaseModel


class SearchRequest(BaseModel):
    query: str


class SearchResponse(BaseModel):
    id: int
    name: str
    description: str
    category: str
    price: float
    similarity: float