import './login.css'
import io from 'socket.io-client'
import { useState } from 'react'
import Chat from '../Chat/Chat'
import React from 'react'
import Logo from "../../images/Kuepa-EduTech.png"

const socket = io.connect('http://localhost:3001')

const Login = () => {
  const [username, setUsername] = useState('')
  const [showChat, setShowChat] = useState(false)
  const room = 'Activa'
  const joinRoom = () => {
    if (username !== '') {
      socket.emit('unirse', room)
      setShowChat(!showChat)
    }
  }
  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <img src={Logo} alt="Logo"/>
          <h3>Login</h3>
          <input
            type="text"
            placeholder="Ingresa tu nombre aquí"
            onChange={(event) => {
              setUsername(event.target.value)
            }}
          />
          <button onClick={joinRoom}>Ingresar</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  )
}

export default Login
