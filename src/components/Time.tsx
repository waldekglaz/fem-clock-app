import Greeting from "./Greeting";
import Button from "./Button";
import { extractLocation } from "../utils/utils";

interface TimeProps {
  isEvening: boolean;
  time: string;
  timeData: any;
  locationData: any;
  isMoreInfoOpen: boolean;
  handleOpenClick: () => void;
}

const Time = ({
  isEvening,
  time,
  timeData,
  locationData,
  isMoreInfoOpen,
  handleOpenClick,
}: TimeProps) => {
  return (
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
  );
};

export default Time;
