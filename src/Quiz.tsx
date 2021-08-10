import React, { useEffect, useState } from "react";
import { a, animated, useSpring, useTrail } from "react-spring";
// import SpecialOffer from "./SpecialOffer";
import { submitAnswers } from "./klaviyo";
import QuizCard from "./QuizCard";
import QuizNavigation from "./QuizNavigation";
// import QuizDataItem from "./QuizDataItem";
import QuizResult from "./QuizResult";
import {
  Answer,
  bundleToText,
  calculateResult,
  DataItem,
  fetchProduct,
  setVisibility,
  // isOverflown,
} from "./utils";

interface TrailProps {
  open: boolean;
  className: string;
}

// Quiz answers trail animation:
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
  setFinishedQuiz: React.Dispatch<React.SetStateAction<boolean>>;
}

const Quiz: React.FC<QuizProps> = ({
  quizData,
  active,
  setActive,
  setFinishedQuiz,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([0]);
  const [answersWeight, setAnswersWeight] = useState([0]);
  const [recommendationBundle, setRecommendationBundle] = useState<any>(null);

  useSpring({
    reset: true,
    reverse: active,
  });

  useEffect(() => {
    const newWeights = [0]; // 0 for question 0 which doesn't exist
    quizData.map((item) => newWeights.push(item.answerWeight));
    setAnswersWeight(newWeights);
  }, [quizData]);

  useEffect(() => {
    if (active) {
      if (currentQuestion === 0) setCurrentQuestion(1); // First Time Active => Trigger Animation
      setVisibility(true);
    } else setVisibility(false);
  }, [active]);

  useEffect(() => {
    if (currentQuestion > quizData.length) {
      let recommendationResult = calculateResult(
        selectedAnswers,
        answersWeight
      );

      fetchProduct(recommendationResult)
        .then((result) => setRecommendationBundle(result))
        .catch((err) => console.error(err));

      const submitData: string[][] = [];
      quizData.map((q, index) => {
        if (index > 0)
          submitData.push([q.question, q.answers[selectedAnswers[index]].text]);
      });

      submitData.push(["Recommend", bundleToText(recommendationResult)]);
      submitAnswers(submitData);
    }
  }, [currentQuestion]);

  return (
    <animated.div className={active ? "quiz quiz-active" : "quiz"}>
      <QuizCard>
        {quizData.map((questionData) => {
          let wrapperClassName =
            "w-full h-full absolute top-0 left-1/2 transform -translate-x-1/2 max-w-prose px-6 py-10 md:px-0 flex flex-col";
          wrapperClassName += " py-8 sm:py-16 md:py-24 overflow-hidden";

          let gridClassName =
            "grid gap-2 grid-cols-2 md:grid-cols-3 mt-6 md:mt-10";
          let btnClassName = "quiz-btn";
          let additionalPaddingRight = "";

          let trailAnimation = false;

          const answersContainerId = "quiz-ul-" + questionData.id;

          const tooManyCharacters = (text: string) => text.length > 15;
          if (
            questionData.answers.some((_answer) =>
              tooManyCharacters(_answer.text)
            )
          ) {
            gridClassName = "grid gap-2 grid-cols-1 mt-6 md:mt-10";
            btnClassName += " text-left max-w-prose";
            additionalPaddingRight = "pr-3";
          } else {
            btnClassName += " whitespace-nowrap";
          }

          if (questionData.id !== currentQuestion) {
            wrapperClassName += " hidden";
          } else trailAnimation = true;

          const handleAnswerClicked = (answer: Answer) => {
            setSelectedAnswers((arr) => {
              const newArr = [...arr];
              newArr[questionData.id] = answer.bundle;
              return newArr;
            });
            setCurrentQuestion((s) => s + 1);
          };

          return (
            <div key={questionData.id} className={wrapperClassName}>
              <h2 className="text-2xl sm:text-3xl normal-case tracking-normal">
                {questionData.question}
              </h2>
              <ul
                id={answersContainerId}
                className="flex-1 overflow-y-auto relative"
              >
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
                {/* <WhiteOverlay answersContainerId={answersContainerId} /> */}
              </ul>
              <QuizNavigation
                currentQuestion={currentQuestion}
                setCurrentQuestion={setCurrentQuestion}
                length={quizData.length}
                additionalPaddingRight={additionalPaddingRight}
                selectedAnswers={selectedAnswers}
              ></QuizNavigation>
            </div>
          );
        })}
        {currentQuestion > quizData.length && (
          <QuizResult
            recommendationBundle={recommendationBundle}
            setFinishedQuiz={setFinishedQuiz}
          />
        )}
        {/* <SpecialOffer /> */}
      </QuizCard>
    </animated.div>
  );
};

// Removed White Overlay
// const WhiteOverlay = ({
//   answersContainerId,
// }: {
//   answersContainerId: string;
// }) => {
//   const answerContainer = document.querySelector("#" + answersContainerId);
//   if (answerContainer)
//     if (isOverflown(answerContainer))
//       return <div className="white-overlay pointer-events-none"></div>;
// else
//   return <></>;
// };

export default Quiz;
