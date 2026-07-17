import json
import numpy as np

from sklearn.metrics.pairwise import cosine_similarity

from app.ai.embedding_service import generate_embedding
from app.models.menu import MenuItem
from app.ai.query_parser import extract_filters


def semantic_search(menu_items: list[MenuItem], query: str):
    query_embedding = generate_embedding(query)
    query_embedding = np.array(query_embedding).reshape(1, -1)

    results = []

    for item in menu_items:
        if not item.embedding:
            continue

        item_embedding = json.loads(item.embedding)
        item_embedding = np.array(item_embedding).reshape(1, -1)

        score = cosine_similarity(
            query_embedding,
            item_embedding
        )[0][0]

        results.append(
            {
                "item": item,
                "score": float(score)
            }
        )

    results.sort(
        key=lambda x: x["score"],
        reverse=True
    )
    filters = extract_filters(query)
    filtered_results = []

    for result in results:
        item = result["item"]

        if filters["veg"] and not item.is_veg:
            continue

        if filters["spicy"] and not item.is_spicy:
            continue

        if (
            filters["max_price"] is not None
            and item.price > filters["max_price"]
        ):
            continue

        if not item.is_available:
            continue

        filtered_results.append(result)

    return filtered_results

    