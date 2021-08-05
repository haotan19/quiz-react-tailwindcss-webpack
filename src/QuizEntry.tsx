import React, { Suspense, useEffect, useState } from "react";
import Quiz from "./Quiz";
// const Quiz = React.lazy(() => import("./Quiz"));
import { Bundle, DataItem } from "./utils";
import BackgroundOverlay from "./BackgroundOverlay";
import QuizIcon from "./QuizIcon";

const q1 = new DataItem(1, "Which is your biggest skin care concern?")
  .addAnswer(
    "Maintaining a healthy, balanced complexion  and proactively protecting my skin against future damage.",
    Bundle.BALANCED
  )
  .addAnswer("Those crow's feet are creeping in!", Bundle.DRY)
  .addAnswer("I'm breaking out : / Help!", Bundle.OILY);
const q2 = new DataItem(2, "Which skin type is most like yours?", 3)
  .addAnswer("On the dry side", Bundle.DRY)
  .addAnswer("Even and balanced", Bundle.BALANCED)
  .addAnswer("Oily and shiny", Bundle.OILY) // Typo in the chart?
  .addAnswer("Struggling with acne . . . help!", Bundle.OILY);
const q3 = new DataItem(3, "How often do you experience breakouts?") // Typo in the chart?
  .addAnswer("Never", Bundle.DRY)
  .addAnswer("Rarely", Bundle.BALANCED)
  .addAnswer("Often", Bundle.OILY);
const q4 = new DataItem(4, "How old are you?", 0.5)
  .addAnswer("18-24", Bundle.OILY)
  .addAnswer("25-34", Bundle.BALANCED)
  .addAnswer("34-44", Bundle.BALANCED)
  .addAnswer("45+", Bundle.DRY);
const q5 = new DataItem(5, "What's your go-to foundation finish?", 0.5)
  .addAnswer("A classy, dewy, glossed look", Bundle.DRY)
  .addAnswer("All natural, keepin' it real", Bundle.BALANCED) // Typo in the chart?
  .addAnswer("Matte to combat unwanted shine", Bundle.OILY);
const q6 = new DataItem(
  6,
  "How would you describe your current skincare routine?",
  0.5
)
  .addAnswer("A 10 step, vogue worthy regimen", Bundle.DRY)
  .addAnswer("Wash and moisturize. Keepin' it simple.", Bundle.BALANCED)
  .addAnswer("Cracking out the makeup wipes at midnight", Bundle.DRY);
const q7 = new DataItem(7, "Describe the environment where you live:", 0.5)
  .addAnswer("Dry and desert-like", Bundle.DRY)
  .addAnswer("Hot + Urban: Livin' that city life", Bundle.BALANCED)
  .addAnswer("Coastal and humid", Bundle.OILY);

const QUIZ_DATA: DataItem[] = [q1, q2, q3, q4, q5, q6, q7];

window.addEventListener("scroll", () => {
  document.documentElement.style.setProperty(
    "--scroll-y",
    `${window.scrollY}px`
  );
});

const QuizEntry = () => {
  const [active, setActive] = useState(false);
  const [btnText, setBtnText] = useState("START QUIZ");
  const [finishedQuiz, setFinishedQuiz] = useState(false);

  useEffect(() => {
    const body = document.body;
    if (active) {
      // Lock Scroll on body
      const scrollY =
        document.documentElement.style.getPropertyValue("--scroll-y");
      body.style.position = "fixed";
      body.style.top = `-${scrollY}`;
    } else {
      const scrollY = body.style.top;
      body.style.position = "";
      body.style.top = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }

    if (finishedQuiz) {
      setBtnText("SHOW MY RESULT");
    } else if (active) {
      setBtnText("RESUME QUIZ");
    }
  }, [active]);

  return (
    <section className="quiz-section grid justify-center gap-4 py-24">
      <h1 className="text-center text-3xl md:text-4xl">KNOW YOUR SKIN</h1>
      <p className="text-center text-lg text-gray-600">
        Ready to find the right skincare products? <br />
        Take a <span className="font-bold">1-min</span> quiz to find out!
      </p>
      <CallToActionButton setActive={setActive} btnText={btnText} />
      <Suspense fallback={<div />}>
        <BackgroundOverlay onClick={() => setActive(false)} active={active} />
        <Quiz
          quizData={QUIZ_DATA}
          active={active}
          setActive={setActive}
          setFinishedQuiz={setFinishedQuiz}
        />
      </Suspense>
    </section>
  );
};

interface BtnProps {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  btnText: string;
}

const CallToActionButton: React.FC<BtnProps> = ({ setActive, btnText }) => {
  return (
    <button
      className="quiz-btn quiz-btn__cta max-w-sm shadow"
      onClick={() => {
        setActive(true);
      }}
    >
      <QuizIcon />
      {btnText}
    </button>
  );
};

export default QuizEntry;
