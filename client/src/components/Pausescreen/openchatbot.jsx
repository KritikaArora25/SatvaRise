function FreeChat() {
  const [msg, setMsg] = useState("");

  return (
    <>
      <input
        placeholder="Ask your question..."
        value={msg}
        onChange={e => setMsg(e.target.value)}
      />
      <button>Send</button>
    </>
  );
}
export default FreeChat;