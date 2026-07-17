from app.ai.embedding_service import generate_embedding

vector = generate_embedding(
    "Healthy vegetarian lunch"
)

print(len(vector))