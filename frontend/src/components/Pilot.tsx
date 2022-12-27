import { PilotType } from '../types'

function Pilot({ pilot }: { pilot: PilotType }) {
  const date = new Date(+pilot.latestNdzBreach)
  return (
    <article className="pilotCard">
      <h3>
        {pilot.firstName} {pilot.lastName}
      </h3>
      <p>{pilot.email}</p>
      <p>{pilot.phoneNumber}</p>
      <p>Closest distance: {pilot.distance} m</p>

      <p>Last seen inside NDZ: {date.toLocaleTimeString('en-GB')}</p>
    </article>
  )
}

export default Pilot
