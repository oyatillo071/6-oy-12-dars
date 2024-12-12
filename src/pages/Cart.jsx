import React, { useContext } from "react";
import { CartContext } from "../App";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Cart() {
  const notifySucces = () => toast("Thanks for choise us");
  const notifyEmpty = () => toast("Your cart is empty");

  const navigate = useNavigate();
  const { cart, setCart } = useContext(CartContext);

  const updateQuantity = (id, quantity) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: parseInt(quantity) } : item
    );
    setCart(updatedCart);
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={1800}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <h1 className="text-center text-2xl mb-10 text-sky-800">Your Cart</h1>
      <div className="flex flex-col gap-4">
        {cart.length == 0 ? (
          <p className="text-red-500 text-center text-3xl">
            Your cart is empty!
          </p>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-2 border-b"
            >
              <div className="flex items-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-cover mr-4"
                />
                <div>
                  <h2>{item.title}</h2>
                  <p>{item.price}$</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, e.target.value)}
                  min="1"
                  className=" border rounded w-[80px] p-2"
                />
                <button
                  onClick={() => removeItem(item.id)}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="mt-4 mx-auto justify-center items-center flex flex-col gap-4">
        <h3>
          Total: <span className="text-green-800"> {totalPrice}</span>$
        </h3>
        <button
          className="px-8 py-1 border border-black  rounded-md hover:bg-black hover:border-none hover:text-white transition-all duration-1000"
          onClick={() => {
            if (cart.length == 0) {
              notifyEmpty();
              setTimeout(() => {
                navigate(-1);
              }, 2000);
            } else {
              notifySucces();
              setCart([]);
              setTimeout(() => {
                navigate(-1);
              }, 2000);
            }
          }}
        >
          Buy
        </button>
      </div>
    </div>
  );
}

export default Cart;
