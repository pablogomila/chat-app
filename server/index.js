const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
const { Server } = require('socket.io')

app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    method: ['GET', 'POST'],
  },
})

io.on('connection', (socket) => {
  socket.on("unirse", (data) => {
    socket.join(data);
    console.log(`Usuario con id ${socket.id} se conecto a la sala ${data}`)
  })
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data)
  })
  socket.on("disconnect", () => {
  })
})

server.listen(3001, () => {
  console.log('listening on port 3001')
})
