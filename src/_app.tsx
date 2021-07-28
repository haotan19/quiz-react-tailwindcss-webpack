// index.tsx
import React from "react";
import ReactDOM from "react-dom";
import QuizEntry from "./QuizEntry";
import "./styles/globals.css";

console.log("Loading Quiz");

ReactDOM.render(<QuizEntry />, document.getElementById("quiz-root"));
