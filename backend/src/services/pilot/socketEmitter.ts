import { io } from '../../index'
import Pilot from '../../models/pilot'


async function emitPilots(pilots: Pilot[]) {
  io.emit('pilots', { pilots })
}

export default emitPilots