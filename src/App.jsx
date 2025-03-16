import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import CityMap from "./components/Map";
import Zone from "./components/Zone";
import Input from "./components/Input";

// const ipKey = import.meta.env.VITE_IP_KEY;
// const ipURL = `https://geo.ipify.org/api/v2/country?apiKey=${ipKey}`;
const log = console.log;

function App() {
  const [ipAddr, setIpAddr] = useState("");
  const [cords, setCords] = useState([0, 0]);
  const [data, setData] = useState({
    ip: "100.28.28.28", // default
    location: "Cameroon",
    timeZone: "UTC-01:00",
    isp: "MTN Link",
  });
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(true);

  const ipURL = `http://ip-api.com/json`;

  useEffect(() => {
    fetch(ipURL)
      .then((res) => {
        setLoading((x) => true);
        return res.json();
      })
      .then((x) => {
        log(x);
        setData({
          ip: x?.query,
          timezone: x?.timezone,
          isp: x?.isp,
          location: `${x?.country}, ${x?.city}`,
        });
        setCords(() => [x.lat, x.lon]);
      })
      .catch((error) => {
        error?.message === "Failed to fetch"
          ? setFailed((x) => true)
          : setFailed((x) => false);
        console.warn(error);
      })
      .finally(() => {
        // log(data);
        setLoading((x) => false);
      });
  }, [ipURL]);

  return loading ? (
    <div className="loading">loading....</div>
  ) : (
    <>
      <Zone
        ip={data.ip}
        isp={data.isp}
        location={data.location}
        timeZone={data.timezone}
      />
      <div className="head">
        <Input />
      </div>
      <CityMap cord={cords} />
    </>
  );
}

export default App;
