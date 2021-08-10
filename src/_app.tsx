// index.tsx
import React from "react";
import ReactDOM from "react-dom";
// import { setVisibility } from "./utils";
import QuizEntry from "./QuizEntry";
import "./styles/globals.css";

ReactDOM.render(<QuizEntry />, document.getElementById("quiz-root"));

// Button for the newsletter to close that sign up section:
// const newsletterBtn = document.querySelector("#quiz-newsletter__close-btn");
// if(newsletterBtn) {
//     newsletterBtn.addEventListener("click", () => {
//         setVisibility(false)
//     })
// }