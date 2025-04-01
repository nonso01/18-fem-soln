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
    ip: "100.28.28.28", // Default IP address
    location: "Cameroon", // Default location
    timezone: "UTC-01:00", // Default timezone
    isp: "MTN Communication Service", // Default ISP
  });
  const [loading, setLoading] = useState(true);
  // const [failed, setFailed] = useState(true);
  const [inputText, setInputText] = useState("");
  const [invalidIp, setInvalidIp] = useState(false);

  const ipURL = "https://freeipapi.com/api/json/";

  const fetchIpData = (url) => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((x) => {
        setData({
          ip: x?.ipAddress,
          timezone: x?.timeZone,
          isp: x?.continent,
          location: `${x?.countryName}, ${x?.cityName}`,
        });
        setCords([x.latitude, x.longitude]);
      })
      .catch((error) => {
        console.warn(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchIpData(ipURL);
  }, []);

  function handleInputText(e) {
    const v = e?.target.value;
    setInputText((x) => v);
  }

  function handleSubmitText() {
    if (testIp.test(inputText)) {
      setInvalidIp(false);
      fetchIpData(`${ipURL}${inputText}`);
      setInputText("");
    } else {
      setInvalidIp(true);
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
