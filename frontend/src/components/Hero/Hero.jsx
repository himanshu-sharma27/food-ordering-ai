function Hero() {
    return (
        <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white">

            <div className="max-w-7xl mx-auto px-6 py-24 text-center">

                <h1 className="text-6xl font-extrabold leading-tight">
                    AI Powered Food Ordering
                </h1>

                <p className="mt-6 text-xl max-w-2xl mx-auto text-orange-100">
                    Discover delicious meals instantly using
                    natural language search powered by AI.
                </p>

                <button
    onClick={() =>
        document
            .getElementById("menu")
            ?.scrollIntoView({
                behavior: "smooth",
            })
    }
    className="bg-white text-orange-500 px-10 py-4 mt-5 rounded-xl font-semibold hover:bg-gray-100 transition"
>
    Browse Menu
</button>

            </div>

        </section>
    );
}

export default Hero;