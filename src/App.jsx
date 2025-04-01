import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import CityMap from "./components/Map";
import Zone from "./components/Zone";
import Input from "./components/Input";

// const ipKey = import.meta.env.VITE_IP_KEY;
// const ipURL = `https://geo.ipify.org/api/v2/country?apiKey=${ipKey}`;
const log = console.log;
const testIp =
  /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

function App() {
  const [ipAddr, setIpAddr] = useState("");
  const [cords, setCords] = useState([0, 0]);
  const [data, setData] = useState({
    ip: "100.28.28.28", // default
    location: "Cameroon",
    timezone: "UTC-01:00",
    isp: "MTN Communication Service",
  });
  const [loading, setLoading] = useState(true);
  // const [failed, setFailed] = useState(true);
  const [inputText, setInputText] = useState("");
  const [invalidIp, setInvalidIp] = useState(false);

  const ipURL = "https://freeipapi.com/api/json/";

  useEffect(() => {
    const fetctIpData = (url) =>
      fetch(url)
        .then((res) => {
          setLoading((x) => true);
          return res.json();
        })
        .then((x) => {
          setData({
            ip: x?.ipAddress,
            timezone: x?.timeZone,
            isp: x?.continent,
            location: `${x?.countryName}, ${x?.cityName}`,
          });
          setCords(() => [x.latitude, x.longitude]);
        })
        .catch((error) => {
          // error?.message === "Failed to fetch"
          //   ? setFailed((x) => true)
          //   : setFailed((x) => false);
          console.warn(error);
        })
        .finally(() => {
          setLoading((x) => false);
        });

    fetctIpData(ipURL);
  }, []);

  function handleInputText(e) {
    const v = e?.target.value;
    setInputText((x) => v);
  }

  function handleSubmitText() {
    if (testIp.test(inputText)) {
      setInvalidIp((x) => false);

      fetch(`${ipURL}${inputText}`)
        .then((res) => {
          setLoading((x) => true);
          return res.json();
        })
        .then((x) => {
          setData({
            ip: x?.ipAddress,
            timezone: x?.timeZone,
            isp: x?.continent,
            location: `${x?.countryName}, ${x?.cityName}`,
          });
          setCords(() => [x.latitude, x.longitude]);
        })
        .catch((error) => {
          // error?.message === "Failed to fetch"
          //   ? setFailed((x) => true)
          //   : setFailed((x) => false);
          console.warn(error);
        })
        .finally(() => {
          setLoading((x) => false);
          setInputText("");
        });

      log(inputText);
    } else {
      setInvalidIp((x) => true);
    }
  }

  return loading ? (
    <div
      className="loading"
      onAnimationEnd={(e) => {
        e.target.classList.add("full");
      }}
    >
      <span className="">loading...</span>
    </div>
  ) : (
    <>
      <Zone
        ip={data.ip}
        isp={data.isp}
        location={data.location}
        timeZone={data.timezone}
      />
      <div className="head">
        <Input
          handleInputText={handleInputText}
          handleSubmitText={handleSubmitText}
          invalidIp={invalidIp}
        />
      </div>
      <CityMap cord={cords} />
    </>
  );
}

export default App;
