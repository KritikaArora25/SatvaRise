// ChatBot.jsx
import { useState } from "react";

const questions = [
  {
    q: "How are you feeling today?",
    options: ["Happy", "Stressed", "Anxious", "Neutral"]
  },
  {
    q: "What’s your main concern?",
    options: ["Career", "Health", "Relationships", "Other"]
  }
];

export default function ChatBot({ isLocked }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);

  if (isLocked)
    return <p>⏳ Answering time over. Ask anything below.</p>;

  return (
    <div>
      <p>{questions[step].q}</p>

      {questions[step].options.map(opt => (
        <button
          key={opt}
          onClick={() => {
            setAnswers([...answers, opt]);
            setStep(step + 1);
          }}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
