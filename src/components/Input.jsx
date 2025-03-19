import arrow from "/images/icon-arrow.svg";

export default function Input({
  handleInputText,
  handleSubmitText,
  invalidIp = false,
}) {
  return (
    <div className={invalidIp ? "input error" : "input"}>
      <h2>IP Address Tracker</h2>
      <label htmlFor="text">
        <input
          type="text"
          placeholder="Input a valid IP from any location"
          onInput={handleInputText}
          id="text"
        />
        <button onClick={handleSubmitText}>
          <img src={arrow} alt="arrow" />
        </button>
      </label>
    </div>
  );
}
