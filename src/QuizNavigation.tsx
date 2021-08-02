import React from "react";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

interface Props {
  currentQuestion: number;
  setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>;
  additionalPaddingRight: string;
  length: number;
  selectedAnswers: number[];
}

const QuizNavigation: React.FC<Props> = ({
  currentQuestion,
  setCurrentQuestion,
  additionalPaddingRight,
  length,
  selectedAnswers,
}) => {
  return (
    <div
      className={
        "self-end w-full flex justify-end gap-2 bottom-8 sm:bottom-14 md:bottom-20 right-6 md:right-0 " +
        additionalPaddingRight
      }
    >
      <button
        disabled={currentQuestion === 1}
        onClick={() => {
          if (currentQuestion > 1) setCurrentQuestion((s) => s - 1);
        }}
        className="quiz-nav-btn"
      >
        <BiLeftArrow className="w-6 h-6" />
      </button>
      <button
        disabled={
          selectedAnswers[currentQuestion] < 0 ||
          selectedAnswers[currentQuestion] == undefined
        }
        onClick={() => {
          if (currentQuestion < length) setCurrentQuestion((s) => s + 1);
        }}
        className="quiz-nav-btn"
      >
        <BiRightArrow className="w-6 h-6" />
      </button>
    </div>
  );
};

export default QuizNavigation;
