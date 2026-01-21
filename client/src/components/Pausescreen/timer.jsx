// Timer.jsx
import { useEffect, useState, useRef } from "react";

export default function Timer({ duration = 30, onComplete }) {
  const [time, setTime] = useState(duration);
  const completedRef = useRef(false);

  // Reset timer when duration changes
  useEffect(() => {
    setTime(duration);
    completedRef.current = false;
  }, [duration]);

  useEffect(() => {
    if (time <= 0 || completedRef.current) return;

    const interval = setInterval(() => {
      setTime(t => {
        if (t === 1) {
          completedRef.current = true;
          onComplete();
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [time, onComplete]);

  const width = (time / duration) * 100;

  return (
    <>
      <div style={{ textAlign: "center", marginBottom: "8px" }}>
        <strong>{time}s</strong>
      </div>

      <div style={{ width: "100%", height: "8px", background: "#eee" }}>
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
