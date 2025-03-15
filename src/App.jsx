import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import CityMap from "./components/Map";

// const ipKey = import.meta.env.VITE_IP_KEY;
// const ipURL = `https://geo.ipify.org/api/v2/country?apiKey=${ipKey}`;
const log = console.log;

function App() {
  const [ipAddr, setIpAddr] = useState("");
  const [cords, setCords] = useState([0, 0]);
  // const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const ipURL = `http://ip-api.com/json`;

  useEffect(() => {
    fetch(ipURL)
      .then((res) => {
        setLoading((x) => true);
        return res.json();
      })
      .then((x) => {
        // log(x);
        setCords(() => [x.lat, x.lon]);
      })
      .catch((error) => console.warn(error))
      .finally(() => setLoading((x) => false));
  }, [ipURL]);



  return loading ? (
    <div className="loading">loading....</div>
  ) : (
    <>
      <CityMap cord={cords} />
      <div className="tail"></div>
    </>
  );
}

export default App;
