import "./App.css"
import io from 'socket.io-client'
import { useState } from 'react'
import Chat from './Chat'

const socket = io.connect('http://localhost:3001')

function App() {
  const [username, setUsername] = useState('')
  const [showChat, setShowChat] = useState(false);
  const room = "Activa"
  const joinRoom = () => {
    if (username !== '' && room !== '') {
      socket.emit('unirse', room);
      setShowChat(!showChat);
    }
  }

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Login</h3>
          <input
            type="text"
            placeholder="Ingresa tu nombre aquí"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Ingresar</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App
