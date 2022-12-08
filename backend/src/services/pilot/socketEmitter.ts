import { io } from '../../index'
import Pilot from '../../models/pilot'


async function emitPilots(pilots: Pilot[]) {
  console.log("EMITTING PILOT DATA NOW")
  io.emit('pilots', { pilots })
}

export default emitPilots