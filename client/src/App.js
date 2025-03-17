import React from "react";
import PizzaList from "./PizzaList";
import { CartProvider } from "./CartContext";

function App() {
  return (
    <CartProvider>
      <div>
        <h1>Pizzazz Pizza</h1>
        <PizzaList />
      </div>
    </CartProvider>
  );
}

export default App;
