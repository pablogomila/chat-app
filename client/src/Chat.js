import React, { useEffect, useState } from 'react'

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState('')
  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      }
      await socket.emit('send_message', messageData)
    }
  }

  useEffect(() => {
      socket.on("receive_message", (data) => {
          console.log(data)
      })
  }, [socket])

  return (
    <div>
      <div className="chat-title">
        <p>Clase {room}</p>
      </div>
      <div className="chat-body"></div>
      <div className="chat-msg">
        <input
          type="text"
          placeholder="Tu mensaje aquí"
          className="chat"
          onChange={(e) => {
            setCurrentMessage(e.target.value)
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  )
}

export default Chat
