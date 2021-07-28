import React, { useEffect, useState } from "react";
import { a, useTrail } from "react-spring";
// import QuizDataItem from "./QuizDataItem";
import BackgroundOverlay from "./BackgroundOverlay";
import QuizCard from "./QuizCard";
import QuizNavigation from "./QuizNavigation";
import { DataItem, Bundle, Answer } from "./utils";

const fetchFakeTestProduct = () => ({
  title: "This is a test title",
  handle: "test-handle",
  price: 12900,
  images: [
    "//cdn.shopify.com/s/files/1/0106/3986/7961/products/combination-skin.png?v=1607391178",
  ],
});

const fetchProduct = (bundle: Bundle) => {
  let fetchStr = "";
  switch (bundle) {
    case Bundle.DRY:
      fetchStr = "/products/dry-mature-skin-bundle.js";
      break;
    case Bundle.BALANCED:
      fetchStr = "/products/balanced-skin-bundle.js";
      break;
    case Bundle.OILY:
      fetchStr = "/products/combination-skin-bundle.js";
      break;
  }
  let result;
  fetch(fetchStr)
    .then((response) => response.json())
    .then((res) => (result = res))
    .catch((err) => console.log(err));
  return result;
};

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
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState({ 0: 0, 1: 0, 2: 0 });

  useEffect(() => {
    console.log(score);
  }, [score]);

  useEffect(() => {
    if (active) {
      if (currentQuestion === 0) setCurrentQuestion(1); // First Time Active => Trigger Animation
    }
  }, [active]);

  return (
    <div className={active ? "quiz quiz-active" : "quiz"}>
      <BackgroundOverlay onClick={() => setActive(false)} />
      <QuizCard>
        {quizData.map((questionData) => {
          let wrapperClassName =
            "w-full h-full absolute top-0 left-1/2 transform -translate-x-1/2 max-w-prose px-6 md:px-0 flex flex-col";
          wrapperClassName += " py-8 sm:py-16 md:py-24 overflow-hidden";

          let gridClassName =
            "grid gap-2 grid-cols-2 md:grid-cols-3 mt-6 md:mt-10";
          let btnClassName = "quiz-btn";
          let additionalPaddingRight = "";

          let trailAnimation = false;

          const tooManyCharacters = (text: string) => text.length > 18;
          if (
            questionData.answers.some((_answer) =>
              tooManyCharacters(_answer.text)
            )
          ) {
            gridClassName = "grid gap-2 grid-cols-1 mt-6";
            btnClassName += " text-left max-w-prose";
            additionalPaddingRight = "pr-3";
          } else {
            btnClassName += " whitespace-nowrap";
          }

          if (questionData.id !== currentQuestion) {
            wrapperClassName += " hidden";
          } else trailAnimation = true;

          const handleAnswerClicked = (answer: Answer) => {
            setCurrentQuestion((s) => s + 1);
          };

          return (
            <div key={questionData.id} className={wrapperClassName}>
              <h2 className="text-2xl sm:text-3xl normal-case tracking-normal">
                {questionData.question}
              </h2>
              <ul className="flex-1 overflow-y-auto relative">
                <Trail open={trailAnimation} className={gridClassName}>
                  {questionData.answers.map((answer, index) => (
                    <li
                      className={additionalPaddingRight}
                      key={answer.text + index}
                    >
                      <button
                        className={btnClassName}
                        onClick={() => handleAnswerClicked(answer)}
                      >
                        {answer.text}
                      </button>
                    </li>
                  ))}
                </Trail>
                <div className="white-overlay"></div>
              </ul>
              <QuizNavigation
                currentQuestion={currentQuestion}
                setCurrentQuestion={setCurrentQuestion}
                length={quizData.length}
                additionalPaddingRight={additionalPaddingRight}
              ></QuizNavigation>
            </div>
          );
        })}
        {currentQuestion > quizData.length && <div>Success!!!</div>}
      </QuizCard>
    </div>
  );
};

export default Quiz;
