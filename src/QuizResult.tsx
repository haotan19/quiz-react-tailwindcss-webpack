import React, { useState } from "react";
import { LoadingSpinner } from "./LoadingSpinner";
import { bundleAddToCart } from "./utils";
import AddToCartButton from "./AddToCartButton";

const MAX_RESULT_CONTENT_HEIGHT = "20rem";

interface Props {
  recommendationBundle: any;
  setFinishedQuiz: React.Dispatch<React.SetStateAction<boolean>>;
}

const QuizResult = ({ recommendationBundle, setFinishedQuiz }: Props) => {
  const [btnState, setBtnState] = useState(0); // 0 default, 1 Adding, 2 SUCCESS, 3 CHECK OUT

  if (!recommendationBundle || !recommendationBundle.images)
    return <LoadingSpinner />;

  const desc = () => {
    return { __html: recommendationBundle.description };
  };

  return (
    <div className="p-4 pb-10 md:p-10 h-full flex flex-col">
      <div className="flex relative">
        <h3 className="w-full text-2xl text-center ">RESULT</h3>
      </div>
      <div className="h-full w-full flex flex-col md:flex-row justify-center items-center">
        <ProductImg recommendationBundle={recommendationBundle} />
        <ProductContent>
          <div className="transform md:translate-y-8">
            <h3 className="text-2xl font-bold tracking-wide">
              {recommendationBundle.title}
            </h3>
            <p>
              <span className="mr-4">$44.90</span>
              <span className="line-through text-gray-300">$49.85</span>
            </p>
            <p className="max-w-prose" dangerouslySetInnerHTML={desc()}>
              {/* We put a short sentence here to describe this product. We put a
              short sentence here to describe this product. */}
            </p>
          </div>
          {/* Working add to cart example: */}
          {/* <button
            className="quiz-btn font-bold mt-4 
                                md:absolute md:bottom-0"
            onClick={() => {
              bundleAddToCart(recommendationBundle.variants[0].id).then(() => {
                setFinishedQuiz(true);
              });
            }}
          >
            ADD TO CART
          </button> */}
          <AddToCartButton
            btnState={btnState}
            setBtnState={setBtnState}
            variantsId={recommendationBundle.variants[0].id}
            bundleAddToCart={bundleAddToCart}
            setFinishedQuiz={setFinishedQuiz}
          />
        </ProductContent>
      </div>
    </div>
  );
};

export default QuizResult;

interface PCProps {
  children: React.ReactNode;
}

const ProductContent = ({ children }: PCProps) => {
  const productContentStyle = {
    maxHeight: MAX_RESULT_CONTENT_HEIGHT,
  };
  return (
    <div
      className="relative flex flex-col justify-between max-w-sm md:max-w-xs md:ml-12 h-full"
      style={productContentStyle}
    >
      {children}
    </div>
  );
};

interface PIProps {
  recommendationBundle: any;
}

const ProductImg = ({ recommendationBundle }: PIProps) => {
  const imgStyles = {
    maxHeight: MAX_RESULT_CONTENT_HEIGHT,
    background: `URL(${recommendationBundle.images[0]})`,
    backgroundPosition: "center",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    height: "100%",
    width: "100%",
  };
  return <div style={imgStyles} className="max-w-sm mb-4 md:mb-0"></div>;
};
