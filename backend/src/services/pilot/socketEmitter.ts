import { io } from '../../index'
import { PilotToClient } from '../../types'

function emitPilots(pilots: PilotToClient[]) {
  console.log('EMITTING PILOT DATA NOW')
  io.emit('pilots', { pilots })
}

export default emitPilots
