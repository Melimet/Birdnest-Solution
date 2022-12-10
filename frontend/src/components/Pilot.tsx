interface PilotProps {
  firstName: string
  lastName: string
  phoneNumber: string
  email: string
  distance: number
  latestNdzBreach: number
}

function Pilot({ pilot }: { pilot: PilotProps }) {
  return (
    <div className="pilotCard">
      <h3>
        {pilot.firstName} {pilot.lastName}
      </h3>
      {Object.keys(pilot).map((attribute) => (
        <p key={attribute}>{attribute}</p>
      ))}
    </div>
  )
}

export default Pilot
