import re


def extract_filters(query: str):
    query = query.lower()

    filters = {
        "veg": False,
        "spicy": False,
        "max_price": None,
    }

    if "veg" in query or "vegetarian" in query:
        filters["veg"] = True

    if "spicy" in query or "hot" in query:
        filters["spicy"] = True

    price = re.search(r"under\s*₹?\s*(\d+)", query)

    if price:
        filters["max_price"] = int(price.group(1))

    return filters