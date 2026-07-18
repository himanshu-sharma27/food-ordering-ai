import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

function FoodCard({ food }) {
    const { addToCart } = useContext(CartContext);
    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">

            <div className="h-52 bg-gray-200 flex items-center justify-center text-6xl">
                🍽️
            </div>

            <div className="p-6">

                <div className="flex justify-between items-start">

                    <h2 className="text-2xl font-bold">
                        {food.name}
                    </h2>

                    <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm">
                        {food.category}
                    </span>

                </div>

                <p className="text-gray-600 mt-4">
                    {food.description}
                </p>

                <div className="flex justify-between items-center mt-6">

                    <h3 className="text-2xl font-bold text-orange-500">
                        ₹{food.price}
                    </h3>

                    {
                        food.similarity && (
                            <span className="text-green-600 font-semibold">
                                ⭐ {(food.similarity * 100).toFixed(0)}%
                            </span>
                        )
                    }

                </div>

                <button

    onClick={() => addToCart(food)}

    className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl transition"

>

    Add To Cart

</button>

            </div>

        </div>
    );
}

export default FoodCard;