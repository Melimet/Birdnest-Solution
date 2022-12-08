import { app } from './app'
import http from 'http'
import { PORT } from './config/config'
import { Server } from 'socket.io'

const server = http.createServer(app)
export const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

io.on('connection', (socket) => {
  console.log('Client connected')
  socket.on('disconnect', () => {
    console.log('Client disconnected')
  })
})

io.on('pilots', (pilots) => {
  console.log("Data being sent to client: ", pilots)
})

server.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`)
})
