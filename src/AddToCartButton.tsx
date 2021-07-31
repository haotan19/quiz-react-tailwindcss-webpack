import React, { useEffect } from "react";
import { LoadingSpinner } from "./LoadingSpinner";

interface Props {
  btnState: number;
  setBtnState: React.Dispatch<React.SetStateAction<number>>;
  variantsId: any;
  bundleAddToCart: (productId: number) => Promise<void>;
  setFinishedQuiz: (value: React.SetStateAction<boolean>) => void;
}

const AddToCartButton = ({
  btnState,
  setBtnState,
  variantsId,
  bundleAddToCart,
  setFinishedQuiz,
}: Props) => {
  const transformYZeroStyle = {
    transform: "translateY(0)",
  };
  // const transformYZeroTextBlackStyle = {
  //   transform: "translateY(0)",
  //   color: "black",
  // };
  const borderWhiteStyle = {
    borderColor: "white",
  };
  const themeCssFix = {
    margin: 0,
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let timer2: NodeJS.Timeout;
    if (btnState === 2) {
      timer = setTimeout(() => {
        setBtnState(3);
      }, 1200);
    }
    if (btnState === 3) {
      timer2 = setTimeout(() => {
        setBtnState(4);
      }, 600);
    }
    return () => {
      if (timer) clearTimeout(timer);
      if (timer2) clearTimeout(timer2);
    };
  }, [btnState]);

  return (
    <div
      className="relative overflow-hidden rounded w-full m-0"
      style={themeCssFix}
    >
      <button
        onClick={() => {
          if (btnState === 0) {
            setBtnState(1);
            bundleAddToCart(variantsId).then(() => {
              setFinishedQuiz(true);
              setBtnState(2);
            });
          }
        }}
        className={
          "quiz-btn w-full h-full flex justify-center items-center " +
          (btnState === 1 ? "bg-gray-900 text-white" : "")
        }
      >
        ADD TO CART
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
        style={
          btnState === 2 || btnState === 3 ? transformYZeroStyle : undefined
        }
      >
        SUCCESS!
      </div>
      <a
        href="/checkout"
        className={
          "w-full h-full absolute left-0 top-0 flex justify-center items-center transition duration-300 ease-out transform translate-y-full bg-white"
        }
        style={
          btnState === 3 || btnState === 4 ? transformYZeroStyle : undefined
        }
      >
        <button
          className="quiz-btn w-full h-full"
          style={btnState === 4 ? undefined : borderWhiteStyle}
        >
          CHECK OUT
        </button>
      </a>
    </div>
  );
};

export default AddToCartButton;
