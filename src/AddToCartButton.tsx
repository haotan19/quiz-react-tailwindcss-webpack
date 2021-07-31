import React, { useEffect } from "react";
import { LoadingSpinner } from "./LoadingSpinner";

interface Props {
  btnState: number,
  setBtnState: React.Dispatch<React.SetStateAction<number>>,
  variantsId: any,
  bundleAddToCart: (productId: number) => Promise<void>,
  setFinishedQuiz: (value: React.SetStateAction<boolean>) => void
}

const AddToCartButton = ({ btnState, setBtnState,variantsId, bundleAddToCart, setFinishedQuiz }: Props) => {
  const transformYZeroStyle = {
    transform: "translateY(0)",
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if(btnState === 2){
      timer = setTimeout(() => {
        setBtnState(3);
      }, 1000);
    }
    return () => {if(timer)clearTimeout(timer)};
  }, [btnState])

  return (
    <div className="relative overflow-hidden rounded w-full m-0">
      <button
        onClick={() => {
          if (btnState === 0) {setBtnState(1);
            bundleAddToCart(variantsId).then(() => {
              setFinishedQuiz(true);
              setBtnState(2)
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
