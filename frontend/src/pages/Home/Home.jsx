import { useEffect, useState } from "react";

import Hero from "../../components/Hero/Hero";
import SearchBar from "../../components/SearchBar/SearchBar";
import FoodGrid from "../../components/FoodGrid/FoodGrid";

import api from "../../services/api";

function Home() {

    const [foods, setFoods] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchMenu();

    }, []);

    async function fetchMenu() {

        try {

            const response = await api.get("/menu");

            setFoods(response.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    }

    return (

        <>

            <Hero />

            <SearchBar onResults={setFoods}/>

            {
                loading

                    ?

                    <h2 className="text-center text-2xl mt-20">
                        Loading menu...
                    </h2>

                    :

                    <FoodGrid foods={foods} />

            }

        </>

    );

}

export default Home;