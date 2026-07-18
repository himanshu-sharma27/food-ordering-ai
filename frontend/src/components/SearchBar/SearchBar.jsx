import { useState } from "react";
import api from "../../services/api";

function SearchBar({ onResults }) {

    const [query, setQuery] = useState("");

    const searchFood = async () => {

        if (!query.trim()) return;

        try {

            const response = await api.post(
                "/search",
                {
                    query: query
                }
            );

            onResults(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="flex gap-4 max-w-3xl mx-auto mt-12">

            <input

                type="text"

                placeholder="Search food using AI..."

                value={query}

                onChange={(e) => setQuery(e.target.value)}

                className="flex-1 p-4 rounded-xl border shadow"

            />

            <button

                onClick={searchFood}

                className="bg-orange-500 text-white px-8 rounded-xl"

            >

                Search

            </button>

        </div>

    );

}

export default SearchBar;