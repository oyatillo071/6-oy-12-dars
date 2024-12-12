import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Timer() {
  const notifyEnd = () => toast("Timer end");

  const [secunds, setSecunds] = useState(0);
  const [timer, setTimer] = useState(null);
  const inputVal = useRef(null);
  const [isInputVisible, setIsInputVisible] = useState(true);
  const [isStart, setIsStart] = useState(true);

  const [pauzaVal, setPauzaValue] = useState(0);

  useEffect(() => {
    if (secunds <= 0) {
      clearInterval(timer);
      setIsInputVisible(true);
      setIsStart(true);
      setPauzaValue(null);
    }
    if (secunds <= 0) {
      notifyEnd();
    }
  }, [secunds, timer]);

  useEffect(() => {
    // console.log(typeof secunds);
    if (secunds > 0) {
      const interval = setInterval(() => {
        setSecunds((prev) => prev - 1);
        console.log(secunds);
      }, 1000);
      setTimer(interval);
      return () => {
        clearInterval(interval);
      };
    }
  }, [secunds]);

  //
  const handleStart = () => {
    const inputValue = Number(inputVal.current.value);
    if (inputValue > 0) {
      inputVal.current.style.border = "none";

      setSecunds(inputValue);
      setIsInputVisible(false);
      setIsStart(false);
      inputVal.current.value = "";
    } else {
      inputVal.current.style.border = "1px solid red";
    }
  };

  const handleContinue = () => {
    let continueValue = pauzaVal > 0 ? pauzaVal : 0;
    if (continueValue > 0) {
      setSecunds(continueValue - 1);
      setIsInputVisible(false);
      setIsStart(false);
      inputVal.current.value = "";
    }
  };

  const handleReset = () => {
    setSecunds(0);
    setPauzaValue(null);

    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
    setIsInputVisible(true);
    setIsStart(true);
  };

  const handleStop = () => {
    console.log("stop", secunds);

    setPauzaValue(secunds);
    clearInterval(timer);
    setIsInputVisible(true);
    setIsStart(true);
    setTimer(null);
  };
  //

  return (
    <div>
      <h1 className="text-center text-5xl mb-10 text-green-950">Timer Page</h1>
      <div className="w-[300px] p-10 rounded flex items-center justify-center flex-col mx-auto">
        <div className="border-[4px] relative border-blue-600 w-[200px] h-[200px] rounded-[50%] mb-20">
          <h2 className="text-[80px] absolute top-[20%] left-[30%] text-center text-white ">
            {secunds}
          </h2>
        </div>

        {isInputVisible && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleStart();
            }}
          >
            <input
              on={handleStart}
              type="number"
              className=" rounded-md px-4 outline-none py-2 w-[210px] "
              placeholder="Enter time in seconds"
              ref={inputVal}
            />
          </form>
        )}
        <div className="flex items-center gap-4 w-[280px] justify-around mt-4">
          {!isStart && (
            <div className="flex items-center gap-4 ">
              <button
                className="button rounded-lg bg-white text-red-500 hover:bg-red-600 hover:text-white border-red-500 px-5 py-2"
                onClick={handleReset}
              >
                Reset
              </button>

              <button
                className="button rounded-lg bg-white border hover:bg-black hover:text-white border-none text-black px-5 py-2"
                onClick={handleStop}
              >
                Stop
              </button>
            </div>
          )}
          {pauzaVal > 0 && (
            <button
              className="button rounded-lg bg-white border border-none text-black px-5 py-2"
              onClick={handleContinue}
            >
              Continue
            </button>
          )}
          {isStart && (
            <button
              className="button rounded-lg bg-white border border-none hover:bg-blue-600 hover:text-white text-black px-20 py-2"
              onClick={handleStart}
            >
              Start
            </button>
          )}
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default Timer;
