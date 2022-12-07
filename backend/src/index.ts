import { app } from './app'
import http from 'http'
import { PORT } from './config/config'
import { Server } from 'socket.io'

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'localhost:5174',
    methods: ['GET'],
  },
})

io.on('connection', (socket) => {
  console.log('a user connected')
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`)
})
