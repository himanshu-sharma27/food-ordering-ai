import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";



function Cart() {

    const { cartItems, removeFromCart , clearCart } = useContext(CartContext);
    const navigate = useNavigate();
    const customerName = "Himanshu";

    async function checkout() {

    try {

        const payload = {

    customer_name: customerName,

    items: cartItems.map(item => ({

        menu_item_id: item.id,

        quantity: item.quantity

    }))

}

        console.log("Checkout clicked");

console.log(payload);

        const response = await api.post(

            "/orders/",

            payload

        );

        clearCart();

       

        toast.success("Order placed successfully!");

        navigate("/");

        console.log(response.data);

    }

    catch (error) {

        console.error(error);

    }

}

    const total = cartItems.reduce(

    (sum, item) =>

        sum + item.price * item.quantity,

    0

);

    return (
        <div className="max-w-5xl mx-auto py-10 px-6">

            <h1 className="text-4xl font-bold mb-8">
                Shopping Cart
            </h1>

            {
                cartItems.length === 0 ? (

                    <h2 className="text-xl text-gray-500">
                        Your cart is empty.
                    </h2>

                ) : (

                    <>
                        <div className="space-y-6">

                            {
                                cartItems.map(item => (

                                    <div
                                        key={item.id}
                                        className="bg-white rounded-xl shadow p-6 flex justify-between items-center"
                                    >

                                        <div>

                                            <h2 className="text-2xl font-semibold">
                                                {item.name}
                                            </h2>

                                             <p className="text-gray-600">

                                                ₹{item.price}

                                            </p>

                                            <p className="text-orange-500">

                                            Quantity: {item.quantity}

                                            </p>

                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
                                        >
                                            Remove
                                        </button>

                                    </div>

                                ))
                            }

                        </div>

                        <div className="mt-10 flex justify-between items-center">

                            <h2 className="text-3xl font-bold">
                                Total
                            </h2>

                            <h2 className="text-3xl text-orange-500 font-bold">
                                ₹{total}
                            </h2>

                        </div>

                        <button

                            onClick={checkout}

                            className="mt-8 w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl text-xl"

                            >

                            Proceed To Checkout

                        </button>

                    </>

                )

            }

        </div>
    );

}

export default Cart;