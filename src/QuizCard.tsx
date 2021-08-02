import React from "react";

interface Props {
  children: React.ReactNode;
}

const QuizCard: React.FC<Props> = ({ children }) => {
  return (
    <div
      className="quiz-card-max-h pointer-events-auto
    bg-white md:rounded-md overflow-hidden shadow-xl w-full  md:max-w-3xl lg:max-w-4xl mx-auto px-4
      absolute bottom-0 md:top-1/2 left-1/2 transform -translate-x-1/2 md:-translate-y-1/2"
    >
      {children}
    </div>
  );
};

export default QuizCard;
