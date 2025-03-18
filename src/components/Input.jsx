import arrow from "/images/icon-arrow.svg";

export default function Input({ handleInputText, handleSubmitText }) {
  return (
    <div className="input ">
      <h2>IP Address Tracker</h2>
      <label htmlFor="" className="">
        <input
          type="text"
          placeholder="Type an ip to preview on the map"
          onInput={handleInputText}
        />
        <button onClick={handleSubmitText}>
          <img src={arrow} alt="arrow" />
        </button>
      </label>
    </div>
  );
}
