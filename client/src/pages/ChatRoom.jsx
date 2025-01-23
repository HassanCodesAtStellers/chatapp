import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { NavLink } from "react-router-dom";
const socket = io("http://localhost:5000");

const ChatRoom = ({ roomId, username }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit("joinRoom", roomId);

    socket.on("recieveMessage", (chaMessage) => {
      setMessages((prevMessages) => [...prevMessages, chatMessage]);
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("sendMessage", {
        room: roomId,
        message,
        sender: username,
      });
      setMessage("");
    }
  };
  return (
    <>
      <NavLink to={"/"}>Home</NavLink>
      <div>
        <h1>Room: {roomId}</h1>
        <ul>
          {messages.map((msg, idx) => {
            <li key={idx}>
              <p>
                {msg.sender}:<strong>{msg.message}</strong>
                <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
              </p>
            </li>;
          })}
        </ul>
      </div>

      <div>
        <input
          type="text"
          placeholder="Write Message"
          required
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send Message</button>
      </div>
    </>
  );
};

export default ChatRoom;