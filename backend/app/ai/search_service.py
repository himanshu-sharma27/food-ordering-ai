import json
import numpy as np

from sklearn.metrics.pairwise import cosine_similarity

from app.ai.embedding_service import generate_embedding
from app.models.menu import MenuItem

def semantic_search(menu_items: list[MenuItem], query: str):
    query_embedding = generate_embedding(query)
    query_embedding = np.array(query_embedding).reshape(1, -1)