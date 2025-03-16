export default function Zone({
  ip = "108.28.28.28",
  location = "Cameroon",
  timeZone = "UTC-01:00",
  isp = "MTN Link",
}) {
  return (
    <div className="zone">
      <div className="prop">
        <h3>IP ADDRESS</h3>
        <p>{ip}</p>
      </div>
      <div className="prop">
        <h3>LOCATION</h3>
        <p>{location}</p>
      </div>
      <div className="prop">
        <h3>TIMEZONE</h3>
        <p>{timeZone}</p>
      </div>
      <div className="prop">
        <h3>ISP</h3>
        <p>{isp}</p>
      </div>
    </div>
  );
}
