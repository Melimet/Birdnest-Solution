interface PilotProps {
  firstName: string
  lastName: string
  phoneNumber: string
  email: string
  distance: number
  latestNdzBreach: number
}


function Pilot({pilot}: {pilot: PilotProps}) {
  return (
    <div className="pilotCard">
      <h2>Pilot</h2>
      <p>
        {pilot.firstName} {pilot.lastName}
      </p>
    </div>
  )
}

export default Pilot
