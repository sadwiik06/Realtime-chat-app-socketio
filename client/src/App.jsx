import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

const App = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    socket.on('messagefromRoom', ({ senderId, text }) => {
      setMessages((prev) => [...prev, { sender: senderId, text }]);
    });

    return () => {
      socket.off("messagefromRoom");
    };
  }, []);

  const joinRoom = () => {
    if (room.trim() !== "" && username.trim() !== "") {
      socket.emit("joinRoom", { room, username });
      setJoined(true);
      setMessages([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    socket.emit('roomMessage', { room, text: input, sender: username });
    setInput("");
  };

  const leaveRoom = () => {
    socket.emit("leaveRoom", room);
    setJoined(false);
    setRoom("");
    setMessages([]);
  };

  return (
    <div className='container mt-5'>
      <div className='row justify-content-center'>
        <div className='col-md-8 col-lg-6'>
          <div className='card shadow'>
            <div className='card-header bg-primary text-white'>
              <h3 className='mb-0'>Chat Application</h3>
            </div>
            
            <div className='card-body'>
              {!joined ? (
                <div className='join-room-section'>
                  <h4 className='text-center mb-4'>Join a Chat Room</h4>
                  <div className='mb-3'>
                    <label htmlFor="username" className="form-label">Your Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor="roomname" className="form-label">Room Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="roomname"
                      value={room}
                      onChange={(e) => setRoom(e.target.value)}
                      placeholder="Enter room name"
                    />
                  </div>
                  <div className='d-grid'>
                    <button 
                      className="btn btn-success btn-lg" 
                      onClick={joinRoom}
                      disabled={!room.trim() || !username.trim()}
                    >
                      Join Room
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className='chat-header d-flex justify-content-between align-items-center mb-3'>
                    <h4 className='mb-0'>Room: <span className='text-primary'>{room}</span></h4>
                    <button className="btn btn-sm btn-outline-danger" onClick={leaveRoom}>
                      Leave Room
                    </button>
                  </div>

                  <div className='chat-messages mb-3'>
                    <div className='list-group' style={{ maxHeight: '400px', overflowY: 'auto' }}>
                      {messages.map((msg, index) => (
                        <div 
                          key={index} 
                          className={`list-group-item ${msg.sender === username ? 'list-group-item-primary' : ''}`}
                        >
                          <strong>{msg.sender}:</strong> {msg.text}
                        </div>
                      ))}
                    </div>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                      />
                      <button type="submit" className="btn btn-primary">
                        Send
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
            
            <div className='card-footer text-muted'>
              <small>Socket.io Chat App</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;