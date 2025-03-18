import React, { useContext } from "react";
import { CartContext } from "./CartContext";

function Cart() {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  if (cart.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.pizza._id}>
            <h3>{item.pizza.name}</h3>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.pizza.price * item.quantity}</p>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => updateQuantity(item.pizza._id, e.target.value)}
            />
            <button onClick={() => removeFromCart(item.pizza._id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <p>
        Total: $
        {cart.reduce(
          (total, item) => total + item.pizza.price * item.quantity,
          0
        )}
      </p>
    </div>
  );
}

export default Cart;
