import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {

    const [cartItems, setCartItems] = useState([]);

    function addToCart(food) {

    setCartItems(previousItems => {

        const existing = previousItems.find(
            item => item.id === food.id
        );

        if (existing) {

            return previousItems.map(item =>

                item.id === food.id

                    ? {
                        ...item,
                        quantity: item.quantity + 1
                    }

                    : item

            );

        }

        return [

            ...previousItems,

            {

                ...food,

                quantity: 1

            }

        ];

    });

}

    function removeFromCart(id) {

        setCartItems((previousItems) =>

            previousItems.filter((item) => item.id !== id)

        );

    }

    function clearCart() {
    setCartItems([]);
    
}

    return (

        <CartContext.Provider

            value={{

                cartItems,

                addToCart,

                removeFromCart,

                clearCart

            }}

        >

            {children}

        </CartContext.Provider>

    );

}