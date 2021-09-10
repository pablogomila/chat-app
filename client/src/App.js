import './App.css'
import io from 'socket.io-client'
import { useState } from 'react'
import Chat from './Chat'

const socket = io.connect('http://localhost:3001')

function App() {
  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('')
  const joinRoom = () => {
    if (username !== '' && room !== '') {
      socket.emit('unirse', room)
    }
  }

  return (
    <div className="App">
      <h1>Entrar al chat</h1>
      <input
        type="text"
        placeholder="Tu nombre aquí"
        onChange={(e) => {
          setUsername(e.target.value)
        }}
      />
      <input
        type="text"
        placeholder="Id de la clase"
        onChange={(e) => {
          setRoom(e.target.value)
        }}
      />
      <button onClick={joinRoom}>Entrar</button>
      <Chat socket={socket} username={username} room={room}/>
{}
    </div>
  )
}

export default App
