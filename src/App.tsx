import { useState, useEffect } from "react";
import Quote from "./components/Quote";
import MoreInfo from "./components/MoreInfo";
import Time from "./components/Time";
import { extractLocation, getCurrentTime } from "./utils/utils";
import { ITimeData, ILocationData } from "./types/types";
import "./App.css";

const App = () => {
  const [timeData, setTimeData] = useState<ITimeData | null>(null);
  const [time, setTime] = useState(getCurrentTime());
  const [quote, setQuote] = useState(null);
  const [locationData, setLocationData] = useState<ILocationData | null>(null);
  const [isMoreInfoOpen, setIsMoreInfoOpen] = useState(false);
  const [isEvening, setIsEvening] = useState(false);

  const fetchQuote = async () => {
    try {
      const response = await fetch("https://api.quotable.io/quotes/random");
      const data = await response.json();
      const quote = data[0];
      setQuote(quote);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://worldtimeapi.org/api/ip");
        const data = await response.json();
        setTimeData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(getCurrentTime());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        if (timeData) {
          const response = await fetch(
            `https://restcountries.com/v3.1/capital/${extractLocation(
              timeData.timezone
            )}`
          );
          const data = await response.json();
          const location = data[0];
          setLocationData(location);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchLocation();
  }, [timeData]);

  const handleOpenClick = () => {
    setIsMoreInfoOpen(!isMoreInfoOpen);
  };
  useEffect(() => {
    const hour = parseInt(time.split(":")[0]);
    if (hour >= 5 && hour < 12) {
      setIsEvening(false);
    } else if (hour >= 12 && hour < 18) {
      setIsEvening(false);
    } else {
      setIsEvening(true);
    }
  }, [time]);

  return (
    <main className={`container ${!isEvening ? "bg--mornings" : "bg-evening"}`}>
      <Quote
        isMoreInfoOpen={isMoreInfoOpen}
        quote={quote}
        onClick={() => fetchQuote()}
      />
      <Time
        isEvening={isEvening}
        time={time}
        timeData={timeData}
        locationData={locationData}
        isMoreInfoOpen={isMoreInfoOpen}
        handleOpenClick={handleOpenClick}
      />
      <MoreInfo
        isEvening={isEvening}
        isMoreInfoOpen={isMoreInfoOpen}
        setIsMoreInfoOpen={setIsMoreInfoOpen}
        timeData={timeData}
      />
    </main>
  );
};

export default App;
