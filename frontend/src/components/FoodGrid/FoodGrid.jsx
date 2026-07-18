import FoodCard from "../FoodCard/FoodCard";

function FoodGrid({ foods }) {

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