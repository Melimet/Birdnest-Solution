import { app } from './app'
import http from 'http'
import { PORT } from './config/config'
import { Server } from 'socket.io'

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

export const pilotSocket = io.of('/api/pilots')

server.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`)
})
