import { app } from './app'
import http from 'http'
import { PORT } from './config/config'
import { Server } from 'socket.io'
import { getPilotsFromDb } from './services/pilot/pilotController'
import convertPilotsToClientFormat from './services/pilot/pilotParser'

const server = http.createServer(app)
export const io = new Server(server)

io.on('connection', async (socket) => {
  console.log('Client connected')
  const pilots = convertPilotsToClientFormat(await getPilotsFromDb())

  socket.emit('pilots', { pilots })
})

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
