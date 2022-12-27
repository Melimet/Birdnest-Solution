import { io } from '../../index'
import { PilotType } from '../../types'

function emitPilots(pilots: PilotType[]) {
  console.log('EMITTING PILOT DATA NOW')
  io.emit('pilots', { pilots })
}

export default emitPilots
