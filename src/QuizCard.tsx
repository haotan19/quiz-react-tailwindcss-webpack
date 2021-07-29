import React from "react";

interface Props {
  children: React.ReactNode;
}

const QuizCard: React.FC<Props> = ({ children }) => {
  const style = {
    maxHeight: "85vh",
  };
  return (
    <div
      style={style}
      className="bg-white rounded-md overflow-hidden shadow-xl w-full h-full 
      max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto px-4
      absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      {children}
    </div>
  );
};

export default QuizCard;
