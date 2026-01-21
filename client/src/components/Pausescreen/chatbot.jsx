import "./chatbot.css";

export default function ChatBot({
  situation,
  options = [],
  isLocked,
  onOptionSelect
}) {
  return (
    <div className="containerchat">
      {/* Situation */}
      <p>{situation || "Stay present. The pause has begun."}</p>

      {/* Options */}
      {options.length > 0 &&
        options.map(opt => (
          <button
            key={opt.id}
            disabled={isLocked}
            onClick={() => onOptionSelect(opt.id)}
          >
            {opt.text}
          </button>
        ))}

      {/* Lock message */}
      {isLocked && (
        <p style={{ opacity: 0.6, marginTop: "8px" }}>
          Time is up. Choose your final decision.
        </p>
      )}
    </div>
  );
}
