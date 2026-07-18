import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {

    const [cartItems, setCartItems] = useState([]);

    function addToCart(food) {

        setCartItems((previousItems) => [

            ...previousItems,

            food,

        ]);

    }

    function removeFromCart(id) {

        setCartItems((previousItems) =>

            previousItems.filter((item) => item.id !== id)

        );

    }

    return (

        <CartContext.Provider

            value={{

                cartItems,

                addToCart,

                removeFromCart,

            }}

        >

            {children}

        </CartContext.Provider>

    );

}