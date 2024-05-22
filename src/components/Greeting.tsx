import Moon from "../assets/icon-moon.svg";
import Sun from "../assets/icon-sun.svg";
import { greeting } from "../utils/utils";

interface GreetingProps {
  isEvening: boolean;
  time: string;
}

const Greeting = ({ isEvening, time }: GreetingProps) => {
  return (
    <p className="greeting">
      <img src={isEvening ? Moon : Sun} />
      <div className="wrapper">
        <span>{greeting(time)}</span>
      </div>
    </p>
  );
};

export default Greeting;
