# SocketTalk

A real-time web application that enables multiple users to chat across different rooms using WebSockets. Built with a focus on speed and a clean, intuitive user interface.

## Features

- **Real-time Messaging**: Instant chat updates across rooms using WebSockets.
- **Multiple Rooms**: Create and join different chat rooms for organized conversations.
- **Fast and Clean UI**: Responsive design with a minimalistic interface for seamless user experience.
- **Multi-user Support**: Handles multiple concurrent users efficiently.

## Technologies Used

- Frontend: HTML, CSS, JavaScript (with WebSocket integration)
- Backend: Node.js with WebSocket library (e.g., Socket.io)
- Other: Any additional libraries for UI (e.g., Bootstrap or custom CSS)

## Installation and Setup

Follow these steps to set up the project locally:

1. **Clone the Repository**:
  ```
  git clone https://github.com/yourusername/socket-talk.git
  cd socket-talk
  ```

2. **Install Dependencies**:
  - For the backend (if separate):
    ```
    cd backend
    npm install
    ```
  - For the frontend:
    ```
    cd fe
    npm install
    ```

3. **Start the Server**:
  - Run the backend server:
    ```
    cd backend
    npm start
    ```
  - The server should start on a port (e.g., 3000).

4. **Run the Frontend**:
  - Open `fe/index.html` in a browser or use a local server:
    ```
    cd fe
    npx http-server
    ```
  - Access the app at `http://localhost:8080` (or your configured port).

5. **Usage**:
  - Open the app in multiple browser tabs or devices.
  - Create or join a room by entering a room name.
  - Start chatting in real-time.

Ensure Node.js and npm are installed on your system. For any issues, check the console for errors.