import React, { useState } from "react";
import { LoadingSpinner } from "./LoadingSpinner";

const AddToCartButton = () => {
  const [btnState, setBtnState] = useState(0); // 0 default, 1 Adding, 2 SUCCESS, 3 CHECK OUT
  const transformYZeroStyle = {
    transform: "translateY(0)",
  };

  return (
    <div className="relative overflow-hidden rounded">
      <button
        onClick={() => {
          if (btnState === 0) setBtnState(1);
          //Debug:
          if (btnState === 1) setBtnState(2);
          if (btnState === 2) setBtnState(3);
        }}
        className={
          "quiz-btn w-full h-full flex justify-center items-center " +
          (btnState === 1 ? "bg-gray-900 text-white" : "")
        }
      >
        FAKE ADD TO CART
        <LoadingSpinner
          className={
            "absolute right-10 top-1/2 w-7 transform -translate-y-1/2 " +
            (btnState === 1 ? "" : "hidden ")
          }
          fillBlack={false}
        />
      </button>
      <div
        className={
          "w-full h-full absolute left-0 top-0 flex justify-center items-center transition duration-300 ease-out transform translate-y-full" +
          " bg-gray-900 text-white "
        }
        style={btnState === 2 ? transformYZeroStyle : undefined}
      >
        SUCCESS!
      </div>
      <a
        href="/checkout"
        className={
          "quiz-btn w-full h-full absolute left-0 top-0 flex justify-center items-center transition duration-300 ease-out transform translate-y-full bg-white" 
          
        }
        style={btnState === 3 ? transformYZeroStyle : undefined}
      >
        CHECK OUT
      </a>
    </div>
  );
};

export default AddToCartButton;
