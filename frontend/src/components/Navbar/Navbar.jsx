import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                <Link
                    to="/"
                    className="text-2xl font-bold text-orange-500"
                >
                    🍕 FoodAI
                </Link>

                <div className="flex gap-8">

                    <Link
                        to="/"
                        className="hover:text-orange-500 transition"
                    >
                        Home
                    </Link>

                    <Link
                        to="/menu"
                        className="hover:text-orange-500 transition"
                    >
                        Menu
                    </Link>

                    <Link
                        to="/orders"
                        className="hover:text-orange-500 transition"
                    >
                        Orders
                    </Link>

                    <Link
                        to="/admin"
                        className="hover:text-orange-500 transition"
                    >
                        Admin
                    </Link>

                </div>

                <button
                    className="bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition"
                >
                    Cart (0)
                </button>

            </div>
        </nav>
    );
}

export default Navbar;