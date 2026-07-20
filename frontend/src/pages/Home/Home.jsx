import { useEffect, useState } from "react";

import Hero from "../../components/Hero/Hero";
import SearchBar from "../../components/SearchBar/SearchBar";
import FoodGrid from "../../components/FoodGrid/FoodGrid";

import api from "../../services/api";

function Home() {

    const [foods, setFoods] = useState([]);

    const [loading, setLoading] = useState(true);

    const [selectedCategory, setSelectedCategory] = useState("All");

    useEffect(() => {

        fetchMenu();

    }, []);

    async function fetchMenu() {

        try {

            const response = await api.get("/menu/");

            setFoods(response.data);

          

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    }

    const categories = [
    "All",
    ...new Set(foods.map(food => food.category))
];

const filteredFoods =
    selectedCategory === "All"
        ? foods
        : foods.filter(
              food => food.category === selectedCategory
          );

    return (

        <>

            <Hero />

            <SearchBar onResults={setFoods}/>

            <div className="max-w-7xl mx-auto px-6 mt-10">
            <div className="flex flex-wrap gap-3 mb-8">
    {categories.map(category => (
        <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-5 py-2 rounded-full transition ${
                selectedCategory === category
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
            }`}
        >
            {category}
        </button>
    ))}
</div>
</div>

            {
                loading

                    ?

                    <h2 className="text-center text-2xl mt-20">
                        Loading menu...
                    </h2>

                    :

                    <FoodGrid foods={filteredFoods} />

            }

        </>

    );

}

export default Home;