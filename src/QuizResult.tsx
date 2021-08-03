import React from "react";
import { LoadingSpinner } from "./LoadingSpinner";
import { bundleAddToCart } from "./utils";

const MAX_RESULT_CONTENT_HEIGHT = "20rem";

interface Props {
  recommendationBundle: any;
}

const QuizResult = ({ recommendationBundle }: Props) => {
  if (!recommendationBundle || !recommendationBundle.images)
    return <LoadingSpinner />;

  return (
    <div className="p-4 pb-10 md:p-10 h-full flex flex-col">
      <div className="flex relative">
        <h3 className="w-full text-2xl text-center ">RESULT</h3>
      </div>
      <div className="h-full w-full flex flex-col md:flex-row justify-center items-center">
        <ProductImg recommendationBundle={recommendationBundle} />
        <ProductContent>
          <div className="transform md:translate-y-8">
            <h3 className="text-2xl font-bold">{recommendationBundle.title}</h3>
            <p>
              <span className="mr-4">$44.90</span>
              <span className="line-through text-gray-300">$49.85</span>
            </p>
            <p className="max-w-prose">
              We put a short sentence here to describe this product. We put a
              short sentence here to describe this product.
            </p>
          </div>
          <button
            className="quiz-btn font-bold mt-4 
                                md:absolute md:bottom-0"
            onClick={() => {
              bundleAddToCart(recommendationBundle.id);
            }}
          >
            ADD TO CART
          </button>
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

const ProductImg = ({ recommendationBundle }: Props) => {
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
