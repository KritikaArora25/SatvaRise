// PauseScreen.jsx
import { useState } from "react";
import Timer from "./timer.jsx";
import ChatBot from "./chatbot.jsx";
import FreeChat from "./openchatbot.jsx";
import { Link } from "react-router-dom";

// 🔁 Toggle this
const USE_MOCK = true;

// Real API (keep for later)
import {
  startPause,
  respondPause,
  decidePause
} from "../api.js";

// Mock API (frontend-only testing)
import {
  mockStartPause,
  mockRespondPause,
  mockDecidePause
} from "../mockPause.js";

export default function PauseScreen() {
  const [pauseSessionId, setPauseSessionId] = useState(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [situation, setSituation] = useState(null);
  const [options, setOptions] = useState([]);
  const [status, setStatus] = useState("IDLE"); // IDLE | ACTIVE | DECISION | DONE | EXPIRED
  const [timeUp, setTimeUp] = useState(false);
  const [expiresIn, setExpiresIn] = useState(30);

  const start = USE_MOCK ? mockStartPause : startPause;
  const respond = USE_MOCK ? mockRespondPause : respondPause;
  const decide = USE_MOCK ? mockDecidePause : decidePause;

  async function handleStartPause() {
    const data = await start();

    setPauseSessionId(data.pauseSessionId);
    setStepIndex(data.stepIndex);
    setSituation(data.situation);
    setOptions(data.options);
    setExpiresIn(data.expiresIn / 1000);
    setStatus("ACTIVE");
    setTimeUp(false);
  }

  async function handleOptionSelect(optionId) {
    if (status !== "ACTIVE") return;

    const data = await respond(optionId);

    if (data.status === "ACTIVE") {
      setSituation(data.situation);
      setOptions(data.options);
      setStepIndex(data.nextStep);
    }

    if (data.status === "DECISION") {
      setSituation(data.message);
      setOptions(data.options);
      setStatus("DECISION");
    }
  }

  async function handleDecision(decision) {
    const data = await decide(decision);

    setSituation(data.reflection);
    setOptions([]);
    setStatus("DONE");
  }

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      {status === "IDLE" && (
        <button onClick={handleStartPause}>
          Start Pause
        </button>
      )}

      {status === "ACTIVE" && (
        <Timer
          duration={expiresIn}
          onComplete={() => setTimeUp(true)}
        />
      )}

      <ChatBot
        situation={situation}
        options={options}
        isLocked={timeUp}
        onOptionSelect={
          status === "DECISION"
            ? handleDecision
            : handleOptionSelect
        }
      />

      {timeUp && status === "DECISION" && <FreeChat />}
      <Link to="/dashboard"><button>Dashboard</button></Link>
    </div>
  );
}
