# SocketTalk

## Project Overview

SocketTalk is a real-time chat application engineered to deliver seamless, low-latency communication between users. Built on WebSocket-based architecture, it eliminates the delays inherent in traditional request–response systems, enabling instantaneous message exchange.

This project reflects a strong grasp of full-stack development, real-time systems, and scalable backend design. It is intended as both a functional product and a demonstration of production-oriented engineering practices.

---

## Features

* **Real-Time Communication**
  Bi-directional messaging powered by WebSockets ensures instant delivery without polling or refresh cycles.

* **Room-Based Architecture**
  Users can create or join isolated chat rooms, enabling structured group conversations.

* **Persistent Message Storage**
  Messages are stored and retrieved efficiently, allowing continuity across sessions.

* **Responsive User Interface**
  Optimised for both desktop and mobile devices, ensuring usability across screen sizes.

* **Efficient Event Handling**
  Server-side event broadcasting ensures minimal overhead while maintaining consistency across connected clients.

---

## Tech Stack

* **Frontend**: React.js, Tailwind CSS
* **Backend**: Node.js, Express.js
* **Real-Time Layer**: WebSockets
* **Tooling**: Git, npm, Vercel (deployment)

---

## System Architecture

The application follows a client-server architecture enhanced with persistent WebSocket connections.

* Clients establish a WebSocket connection with the server.
* Each user joins a specific room, managed server-side.
* Messages are emitted as events and broadcast selectively to room participants.
* The system avoids unnecessary re-renders and redundant listeners, ensuring efficient runtime behaviour.
* Note:- MongoDB can be used to persist chat history and user data.

This design allows horizontal scalability and efficient handling of concurrent users.

---

## Installation & Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/socketTalk.git
cd socketTalk
```

### 2. Install Dependencies

```bash
# Backend
npm install

# Frontend
cd client
npm install
```


### 3. Run the Application

```bash
# Start backend
npm run server

# Start frontend
cd client
npm start
```

---

## Usage

2. Enter or create a chat room
3. Start sending messages in real time

Messages are instantly reflected across all connected clients within the same room.

---

## Live Demo

https://socket-talk-liart.vercel.app/

---

## Folder Structure

```
client/        → React frontend
server/        → WebSocket logic

```

---

## Future Improvements

* End-to-end encryption for enhanced privacy
* Typing indicators and read receipts
* Media/file sharing support
* Improved scalability using Redis or message brokers
* Presence tracking (online/offline status)

---

## Contributing

Contributions are welcome. Please fork the repository, create a feature branch, and submit a pull request with clear descriptions of your changes.

---

## License

This project is licensed under the MIT License.
