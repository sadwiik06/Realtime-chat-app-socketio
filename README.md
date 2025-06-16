# 🧠 Realtime Chat App with Socket.IO

A lightweight, real-time chat application built with **React** on the frontend and **Node.js + Socket.IO** on the backend. Supports dynamic room creation, user identification, and instant message broadcasting.

---

## 🚀 Features

- Join chat rooms by name (no login required)
- Send and receive messages in real time
- Display sender name for each message
- Broadcast when a user leaves the room
- Clean, Bootstrap-powered UI

---

## 🛠 Tech Stack

**Frontend:**
- React
- Bootstrap 5

**Backend:**
- Express.js
- Socket.IO
- 
| Frontend       | Backend          | Communication |
|----------------|----------------  |---------------|
| React          | Node.js + Express| Socket.IO     |
| Bootstrap 5    | CORS             | WebSockets    |

**Note:**  
🚫 No database integration yet — messages are stored only in memory per session.

## 🔧 Setup Instructions

### 1. Clone the Repo
git clone https://github.com/sadwiik06/Realtime-chat-app-socketio.git
cd realtime-chat-app-socketio

### 2. Run Server
cd server
npm install
node index.js

### 3. Run Client
cd client
npm install
npm run dev

⚠️ Make sure the client is served from http://localhost:5173 (Vite default)
Server listens at http://localhost:3000
