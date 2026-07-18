import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

function Navbar() {

    const { cartItems } = useContext(CartContext);

    return (

        <nav className="bg-white shadow-md sticky top-0 z-50">

            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                <NavLink
                    to="/"
                    className="text-3xl font-bold text-orange-500"
                >
                    🍕 FoodAI
                </NavLink>

                <div className="flex gap-8">

                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive
                                ? "text-orange-500 font-semibold"
                                : "hover:text-orange-500"
                        }
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/admin"
                        className={({ isActive }) =>
                            isActive
                                ? "text-orange-500 font-semibold"
                                : "hover:text-orange-500"
                        }
                    >
                        Admin
                    </NavLink>

                </div>

                <NavLink
                    to="/cart"
                    className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg transition"
                >
                    Cart ({cartItems.length})
                </NavLink>

            </div>

        </nav>

    );
}

export default Navbar;