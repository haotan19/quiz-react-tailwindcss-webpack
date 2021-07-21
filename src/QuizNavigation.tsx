import React from "react";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

interface Props {
  currentQuestion: number;
  setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>;
  additionalPaddingRight: string
}

const QuizNavigation: React.FC<Props> = ({
  currentQuestion,
  setCurrentQuestion,
  additionalPaddingRight
}) => {
  return (
    <div className={"self-end w-full flex justify-end gap-2  bottom-8 sm:bottom-14 md:bottom-20 right-6 md:right-0 " + additionalPaddingRight}>
      <button
        disabled={!currentQuestion}
        onClick={() => {
          if (currentQuestion) setCurrentQuestion((s) => s - 1);
        }}
      >
        <BiLeftArrow className="w-6 h-6"/>
      </button>
      <button
        //TODO: Disabled if question is not answered.
        onClick={() => {
          setCurrentQuestion((s) => s + 1);
        }}
      >
        <BiRightArrow className="w-6 h-6"/>
      </button>
    </div>
  );
};

export default QuizNavigation;
