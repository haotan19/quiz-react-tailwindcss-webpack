import React from "react";

interface Props {
  recommendationBundle: any;
}

const QuizResult = ({ recommendationBundle }: Props) => {
  if (recommendationBundle.images && recommendationBundle.images[0]) {
    const mainImg = (
      <img
        className="max-h-96"
        src={recommendationBundle.images[0]}
        alt={recommendationBundle}
      />
    );
    return (
      <div className="p-4 h-full flex flex-col justify-center gap-3 md:gap-10">
        <div>
          {/* The image we use have a lot of white spaces on the top */}
          {/* So we use a <div> to remove the gap */}
          <h3 className="text-2xl text-center">RESULT</h3>
          {mainImg}
        </div>

        <h3 className="text-2xl font-bold">{recommendationBundle.title}</h3>
        <p>
          <span className="mr-4">$44.90</span>
          <span className="line-through text-gray-300">$49.85</span>
        </p>
        <p className="max-w-prose">
          We put a short sentence here to describe this product. We put a short
          sentence here to describe this product.
        </p>
        <button className="quiz-btn font-bold mt-4">ADD TO CART</button>
      </div>
    );
  } else {
    return <LoadingSpinner />;
  }
};

export default QuizResult;

const LoadingSpinner = () => (
  <div className="h-full w-full flex justify-center items-center">
    <svg
      className="quiz-loading"
      version="1.1"
      id="loader-1"
      x="0px"
      y="0px"
      width="40px"
      height="40px"
      viewBox="0 0 50 50"
    >
      <path
        fill="#000"
        d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
      >
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="rotate"
          from="0 25 25"
          to="360 25 25"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  </div>
);
