import { app } from './app'
import http from 'http'
import { PORT } from './config/config'
import { Server } from 'socket.io'
import { getPilots } from './services/pilot/pilotController'

const server = http.createServer(app)
export const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

io.on('connection', async (socket) => {
  console.log('Client connected')
  socket.send({pilots: await getPilots()
  })
})

io.on('pilots', (pilots) => {
  console.log("Data being sent to client: ", pilots)
})

server.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`)
})
