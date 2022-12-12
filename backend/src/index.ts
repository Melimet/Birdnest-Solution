import { app } from './app'
import http from 'http'
import { PORT } from './config/config'
import { Server } from 'socket.io'
import { getPilots } from './services/pilot/pilotController'
import convertBreachTimeToTimeString from './services/pilot/pilotParser'

const server = http.createServer(app)
export const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

io.on('connection', async (socket) => {
  console.log('Client connected')
  const pilots = convertBreachTimeToTimeString(await getPilots())

  socket.emit('pilots', { pilots })
})


server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
