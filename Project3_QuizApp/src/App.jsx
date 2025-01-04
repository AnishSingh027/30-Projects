import React, { useEffect, useState } from "react";
import questions from "./utils/questions";
import "./App.css";

const App = () => {
  const [question, setQuestion] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    setQuestion(questions);
  }, []);

  const currentQuestion = question[questionIndex];

  const NextBtn = () => {
    if (questionIndex < question.length) {
      setQuestionIndex((value) => value + 1);
      setIsAnswered(false);
      setSelectedAnswer(null);
    } else {
      console.log("Game ends");
    }
  };

  const GameReset = () => {
    setQuestionIndex(0);
    setScore(0);
    setIsAnswered(false);
    setSelectedAnswer(null);
  };

  const HandleClick = (id, isCorrect) => {
    setSelectedAnswer(id);
    setIsAnswered(true);
    if (isCorrect === true) {
      setScore((prev) => {
        let newScore = prev + 1;
        return newScore;
      });
    }
  };

  return (
    <div className="bg-blue-950 h-screen w-full flex items-center justify-center font-mono">
      <div className="quiz-container bg-white py-7 px-6 rounded w-[600px]">
        <h1 className="text-3xl font-bold text-blue-950 mb-7">Simple Quiz</h1>
        <div className="line h-[2px] bg-blue-950 mb-4"></div>
        <h1 className="text-2xl font-semibold text-blue-950 py-3">
          {questionIndex !== question.length
            ? currentQuestion?.question
            : `Your score is ${score} out of ${question.length}`}
        </h1>
        {questionIndex !== question.length && (
          <div className="answer-btns">
            {currentQuestion?.answers?.map((values, i) => {
              let buttonClass =
                "px-5 py-3 border-solid border-blue-950 rounded w-full text-xl border-2 mb-4 text-start text-blue-950 transition-all";

              if (isAnswered) {
                if (values.correct) {
                  buttonClass += " bg-green-300";
                } else if (i === selectedAnswer && !values.correct) {
                  buttonClass += " bg-red-300";
                }
              } else {
                buttonClass += " bg-white";
              }

              return (
                <button
                  key={i}
                  className={buttonClass}
                  onClick={() => {
                    HandleClick(i, values.correct);
                  }}
                  disabled={isAnswered}
                >
                  {values?.text}
                </button>
              );
            })}
          </div>
        )}
        {questionIndex !== question.length && (
          <div className="next-btn mt-2">
            <button
              className="bg-blue-950 text-white text-xl m-auto px-8 py-3 rounded block"
              onClick={NextBtn}
              disabled={!isAnswered}
            >
              Next
            </button>
          </div>
        )}
        {questionIndex === question.length && (
          <div className="next-btn mt-2">
            <button
              className="bg-blue-950 text-white text-xl m-auto px-8 py-3 rounded block"
              onClick={GameReset}
            >
              Play Again !
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
