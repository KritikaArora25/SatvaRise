// Timer.jsx
import { useEffect, useState } from "react";

export default function Timer({ onComplete }) {
  const [time, setTime] = useState(30);
  const [paused, setPaused] = useState(false);
  const [width, setWidth] = useState(100);

  useEffect(() => {
    if (paused || time === 0) return;

    const interval = setInterval(() => {
      setTime(t => {
        if (t === 1) onComplete();
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [paused, time]);

  useEffect(() => {
        setWidth((time / 30) * 100);
    }, [time]);

  return (
    <>
    <div style={{ display: "flex", alignItems: "center", gap: "10px",justifyContent: "center", marginBottom: "10px" }}>
      <h2 >{time}s</h2>
      <button onClick={() => setPaused(p => !p)}>
        {paused ? "Resume" : "Pause"}
      </button>
    </div>
    <div style={{ width: "100%", height: "10px", background: "#ddd" }}>
      <div
        style={{
          width: `${width}%`,
          height: "100%",
          background: "#7a6f58",
          transition: "width 1s linear"
        }}
      />
    </div>
    </>
  );
}
