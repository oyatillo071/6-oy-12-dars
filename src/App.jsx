import React, { createContext, useState } from "react";
import { Route, Routes, NavLink } from "react-router-dom";
import Food from "./pages/Food";
import Cart from "./pages/Cart";
import Timer from "./pages/Timer";
import data from "./data.json";

export const FoodContext = createContext();
export const CartContext = createContext();

function App() {
  const [food, setFood] = useState(data);
  const [cart, setCart] = useState([]);

  return (
    <FoodContext.Provider value={{ food, setFood }}>
      <CartContext.Provider value={{ cart, setCart }}>
        <nav className="flex items gap-5 justify-center  bg-slate-400 p-5 w-full">
          <NavLink
            to="/food"
            className="text-cyan-900 hover:text-white underline-offset-8 transition-all duration-300 hover:underline text-2xl"
          >
            Food
          </NavLink>
          <NavLink
            to="/cart"
            className="text-cyan-900 hover:text-white underline-offset-8 transition-all duration-300 hover:underline text-2xl"
          >
            Cart
          </NavLink>
          <NavLink
            to="/timer"
            className="text-cyan-900 hover:text-white underline-offset-8 transition-all duration-300 hover:underline text-2xl"
          >
            Timer
          </NavLink>
        </nav>
        <div className="bg-gray-300 h-[100vh] py-5">
          <div className="container mx-auto">
            <Routes>
              <Route path="/" index element={<Food />} />
              <Route path="/food" element={<Food />} />

              <Route path="/cart" element={<Cart />} />
              <Route path="/timer" element={<Timer />} />
            </Routes>
          </div>
        </div>
      </CartContext.Provider>
    </FoodContext.Provider>
  );
}

export default App;
