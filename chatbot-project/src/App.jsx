import { Chatbot } from 'supersimpledev';
import { useState, useRef, useEffect } from 'react';
import './App.css';

function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState('');

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  function sendMessage() {
    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID(),
      },
    ];

    setChatMessages(newChatMessages);

    const response = Chatbot.getResponse(inputText);
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: 'robot',
        id: crypto.randomUUID(),
      },
    ]);

    setInputText('');
  }

  return (
    <div className="chat-input-container">
      <input
        className="chat-input"
        placeholder="Send a message to Chatbot"
        onChange={saveInputText}
        value={inputText}
      />
      <button className="chat-send-button" onClick={sendMessage}>
        Send
      </button>
    </div>
  );
}

function ChatMessage({ message, sender }) {
  return (
    <div
      className={sender === 'user' ? 'chat-message-user' : 'chat-message-robot'}
    >
      {sender === 'robot' && (
        <img
          src="https://raw.githubusercontent.com/itsanup1/React-Course/main/robot.png"
          className="chat-message-profile"
        />
      )}
      <div className="chat-message-text">{message}</div>
      {sender === 'user' && (
        <img
          src="https://raw.githubusercontent.com/itsanup1/React-Course/main/user.png"
          className="chat-message-profile"
        />
      )}
    </div>
  );
}

function ChatMessages({ chatMessages }) {
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    const containerElem = chatMessagesRef.current;
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div className="chat-message-container" ref={chatMessagesRef}>
      {chatMessages.map((chatMessage) => {
        return (
          <ChatMessage
            message={chatMessage.message}
            sender={chatMessage.sender}
            key={chatMessage.id}
          />
        );
      })}
    </div>
  );
}

function App() {
  const [chatMessages, setChatMessages] = useState([
    {
      message: 'hello chatbot',
      sender: 'user',
      id: 'id1',
    },
    {
      message: 'Hello! How can I help you?',
      sender: 'robot',
      id: 'id2',
    },
    {
      message: 'can you get me todays date?',
      sender: 'user',
      id: 'id3',
    },
    {
      message: 'Today is September 27',
      sender: 'robot',
      id: 'id4',
    },
  ]);

  return (
    <div className="chatbot-container">
      <ChatMessages chatMessages={chatMessages} />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default App;
