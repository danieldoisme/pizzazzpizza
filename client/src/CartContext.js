import React, { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (pizza) => {
    const existingItem = cart.find((item) => item.pizza._id === pizza._id);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.pizza._id === pizza._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { pizza: pizza, quantity: 1 }]);
    }
  };

  const removeFromCart = (pizzaId) => {
    setCart(cart.filter((item) => item.pizza._id !== pizzaId));
  };

  const updateQuantity = (pizzaId, quantity) => {
    setCart(
      cart.map((item) =>
        item.pizza._id === pizzaId
          ? { ...item, quantity: parseInt(quantity) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const contextValue = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}
