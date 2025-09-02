export function ChatMessage({ message, sender }) {
  return (
    <div
      className={sender === 'user' ? 'chat-message-user' : 'chat-message-robot'}
    >
      {sender === 'robot' && (
        <img
          src="https://raw.githubusercontent.com/itsanup1/React-practice/main/chatbot-project/src/assets/robot.png"
          className="chat-message-profile"
        />
      )}
      <div className="chat-message-text">{message}</div>
      {sender === 'user' && (
        <img
          src="https://raw.githubusercontent.com/itsanup1/React-practice/main/chatbot-project/src/assets/user.png"
          className="chat-message-profile"
        />
      )}
    </div>
  );
}
