interface PilotProps {
  firstName: string
  lastName: string
  phoneNumber: string
  email: string
  distance: number
  latestNdzBreach: number
}

function Pilot({ pilot }: { pilot: PilotProps }) {
  const date = new Date(Number(pilot.latestNdzBreach))
  const timeString = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

  return (
    <article className="pilotCard">
      <h3>
        {pilot.firstName} {pilot.lastName}
      </h3>
      <p>{pilot.email}</p>
      <p>{pilot.phoneNumber}</p>
      <p>Closest distance: {pilot.distance} m</p>

      <p>Last seen: {timeString}</p>
    </article>
  )
}

export default Pilot
