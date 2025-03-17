import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "./CartContext";

function PizzaList() {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    async function fetchPizzas() {
      try {
        const response = await fetch("http://localhost:5050/api/pizzas");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPizzas(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchPizzas();
  }, []);

  if (loading) {
    return <p>Loading pizzas...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h2>Our Pizzas</h2>
      <ul>
        {pizzas.map((pizza) => (
          <li key={pizza._id}>
            <h3>{pizza.name}</h3>
            <p>{pizza.description}</p>
            <p>Price: ${pizza.price}</p>
            <p>Ingredients: {pizza.ingredients.join(", ")}</p>
            {pizza.image && (
              <img
                src={pizza.image}
                alt={pizza.name}
                style={{ maxWidth: "200px" }}
              />
            )}
            <button onClick={() => addToCart(pizza)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PizzaList;
