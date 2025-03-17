export default function Input({}) {
  return (
    <div className="input ">
      <h2>IP Address Tracker</h2>
      <label htmlFor="">
        {" "}
        <input type="text" placeholder="Type an ip to preview on the map" />
      </label>
    </div>
  );
}
