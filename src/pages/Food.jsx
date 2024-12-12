import React, { useState, useContext } from "react";
import { FoodContext } from "../App";
import { CartContext } from "../App";

function Food() {
  const { food } = useContext(FoodContext);
  const { cart, setCart } = useContext(CartContext);

  const [selectedQuantity, setSelectedQuantity] = useState({});

  function handleQuantityChange(e, id) {
    const quantity = parseInt(e.target.value, 10);
    setSelectedQuantity((prev) => ({
      ...prev,
      [id]: quantity,
    }));
  }

  const addToCart = (item, quantity) => {
    const cartCopy = [...cart];

    const existingItemIndex = cartCopy.findIndex(
      (cartItem) => cartItem.id === item.id
    );
    if (existingItemIndex > -1) {
      cartCopy[existingItemIndex].quantity += quantity;
    } else {
      cartCopy.push({ ...item, quantity });
    }

    setCart(cartCopy);
  };

  return (
    <div>
      <h1 className="text-center text-2xl mb-10">Food Page</h1>
      <div className="flex items-center flex-wrap w-full p-1 gap-4 justify-between ">
        {food.map((item) => (
          <div
            className="flex group items-center bg-white shadow-sm hover:shadow-2xl transition-all duration-1000 ease-linear flex-col w-[350px] h-[450px] pb-3 overflow-hidden border rounded-lg"
            key={item.id}
          >
            <div className="w-full h-[250px]">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[180px] object-cover"
              />
            </div>
            <div className="p-2 flex flex-col items-center gap-2">
              <h2 className="text-[24px] text-cyan-900">{item.title}</h2>
              <p className="hidden group-hover:block text-[16px] max-w-[80%] transition-all ease-linear duration-1000 text-center font-light">
                {item.description}
              </p>
              <p className="text-green-700 text-[18px]">{item.price}$</p>

              <div>
                <label htmlFor={`quantity-${item.id}`} className="mr-2 ">
                  Quantity:
                </label>
                <div className="flex items-center mt-3 gap-4">
                  <input
                    type="number"
                    id={`quantity-${item.id}`}
                    value={selectedQuantity[item.id] || 1}
                    onChange={(e) => handleQuantityChange(e, item.id)}
                    min="1"
                    className="p-2 border rounded w-[80px] outline-none"
                  />
                  <button
                    onClick={() =>
                      addToCart(item, selectedQuantity[item.id] || 1)
                    }
                    className=" p-2 bg-blue-500 text-white rounded"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Food;
