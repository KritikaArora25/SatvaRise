// TimedChat.jsx
import { useState } from "react";
import Timer from "./timer.jsx";
import ChatBot from "./chatbot.jsx";
import FreeChat from "./openchatbot.jsx";

export default function PauseScreen() {
  const [timeUp, setTimeUp] = useState(false);
  const [time, setTime] = useState(30);

  return (
    <div>
      <Timer onComplete={() => setTimeUp(true)} />
      <ChatBot isLocked={timeUp} />
      {timeUp && <FreeChat />}
    </div>
  );
}
