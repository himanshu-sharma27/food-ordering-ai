import Hero from "../../components/Hero/Hero";
import SearchBar from "../../components/SearchBar/SearchBar";
import FoodGrid from "../../components/FoodGrid/FoodGrid";

function Home() {
    return (
        <>
            <Hero />
            <SearchBar />
            <FoodGrid />
        </>
    );
}

export default Home;