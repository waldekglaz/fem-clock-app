import { useState, useEffect } from "react";
import Button from "./components/Button";
import Quote from "./components/Quote";
import Greeting from "./components/Greeting";
import CategoryItem from "./components/CategoryItem";
import { day_of_week, extractLocation, getCurrentTime } from "./utils/utils";
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
      <div className="time">
        <div className="wrapper">
          <Greeting isEvening={isEvening} time={time} />
          <div className="time-display">
            <div className="hours">{time}</div>
            <div className="abbreviation">{timeData?.abbreviation}</div>
          </div>

          {timeData && (
            <div className="location">
              In {extractLocation(timeData.timezone)}, {locationData?.cca2}
            </div>
          )}
        </div>
        <Button isOpen={isMoreInfoOpen} onClick={handleOpenClick} />
      </div>
      <div
        className={`more-info ${!isMoreInfoOpen ? "hidden" : null} ${
          isEvening ? "evening" : "daytime"
        }`}
      >
        <div className="wrapper">
          <div className="categories">
            <CategoryItem title="Current timezone" value={timeData?.timezone} />
            <CategoryItem
              title="Day of the year"
              value={timeData?.day_of_year}
            />
          </div>
          <div className="categories">
            <CategoryItem
              title="Day of the week"
              value={day_of_week(timeData?.day_of_week)}
            />
            <CategoryItem title="Week number" value={timeData?.week_number} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;
