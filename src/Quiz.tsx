import React, { useEffect, useState } from "react";
import { a, useTrail } from "react-spring";
// import QuizDataItem from "./QuizDataItem";
import BackgroundOverlay from "./BackgroundOverlay";
import QuizCard from "./QuizCard";
import QuizNavigation from "./QuizNavigation";
import { DataItem } from "./utils";

interface TrailProps {
  open: boolean;
  className: string;
}

const Trail: React.FC<TrailProps> = ({ open, className, children }) => {
  const items = React.Children.toArray(children);
  const trail = useTrail(items.length, {
    config: { mass: 3, tension: 2000, friction: 220 },
    opacity: open ? 1 : 0,
    y: open ? 0 : 20,
    border: open ? 3 : 0,
    from: { opacity: 0, y: 20, height: 0 },
  });
  return (
    <div className={className}>
      {trail.map(({ height, ...style }, index) => (
        <a.div key={index} style={style}>
          <a.div>{items[index]}</a.div>
        </a.div>
      ))}
    </div>
  );
};

interface QuizProps {
  quizData: DataItem[];
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const Quiz: React.FC<QuizProps> = ({ quizData, active, setActive }) => {
  const [currentQuestion, setCurrentQuestion] = useState(-1);

  useEffect(() => {
    if (active) {
      if (currentQuestion === -1) setCurrentQuestion(0); // First Time Active => Trigger Animation
    }
  }, [active]);

  return (
    <div className={active ? "quiz quiz-active" : "quiz"}>
      <BackgroundOverlay onClick={() => setActive(false)} />
      <QuizCard>
        {quizData.map((dataItem) => {
          let wrapperClassName =
            "w-full h-full absolute top-0 left-1/2 transform -translate-x-1/2 max-w-prose px-6 md:px-0 flex flex-col";
          wrapperClassName += " py-8 sm:py-16 md:py-24 overflow-hidden";

          let gridClassName = "grid gap-2 grid-cols-2 md:grid-cols-3 mt-6 md:mt-10";
          let btnClassName = "quiz-btn";
          let additionalPaddingRight = "";

          let trailAnimation = false;

          const tooManyCharacters = (text: string) => text.length > 18;
          if (dataItem.answers.some(tooManyCharacters)) {
            gridClassName = "grid gap-2 grid-cols-1";
            btnClassName += " text-left max-w-prose";
            additionalPaddingRight = "pr-3";
          } else {
            btnClassName += " whitespace-nowrap";
          }

          if (dataItem.id !== currentQuestion) {
            wrapperClassName += " hidden";
          } else trailAnimation = true;

          return (
            <div key={dataItem.id} className={wrapperClassName}>
              <h2 className="text-2xl sm:text-3xl normal-case tracking-normal">{dataItem.question}</h2>
              <ul className="flex-1 overflow-y-auto relative">
                <Trail open={trailAnimation} className={gridClassName}>
                  {dataItem.answers.map((answer, index) => (
                    <li className={additionalPaddingRight} key={answer + index}>
                      <button
                        className={btnClassName}
                        onClick={() => setCurrentQuestion((s) => s + 1)}
                      >
                        {answer}
                      </button>
                    </li>
                  ))}
                </Trail>
                <div className="white-overlay"></div>
              </ul>
              <QuizNavigation
                currentQuestion={currentQuestion}
                setCurrentQuestion={setCurrentQuestion}
                additionalPaddingRight={additionalPaddingRight}
              ></QuizNavigation>
            </div>
          );
        })}
        {currentQuestion > quizData.length - 1 && <div>Success!!!</div>}
      </QuizCard>
    </div>
  );
};

export default Quiz;
