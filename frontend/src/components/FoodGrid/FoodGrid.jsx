import FoodCard from "../FoodCard/FoodCard";

const foods = [
    {
        id: 1,
        name: "Veg Burger",
        description: "Crispy spicy burger",
        category: "Burger",
        price: 149,
        similarity: 0.94,
    },
    {
        id: 2,
        name: "Paneer Pizza",
        description: "Cheesy paneer pizza",
        category: "Pizza",
        price: 299,
        similarity: 0.88,
    },
    {
        id: 3,
        name: "Veg Fried Rice",
        description: "Healthy rice with vegetables",
        category: "Rice",
        price: 199,
        similarity: 0.91,
    },
];

function FoodGrid() {
    return (
        <section className="max-w-7xl mx-auto px-6 py-16">

            <h2 className="text-4xl font-bold mb-10">
                Popular Foods
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                {
                    foods.map((food) => (
                        <FoodCard
                            key={food.id}
                            food={food}
                        />
                    ))
                }

            </div>

        </section>
    );
}

export default FoodGrid;