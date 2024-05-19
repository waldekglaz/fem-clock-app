import Moon from "../assets/icon-moon.svg";
import Sun from "../assets/icon-sun.svg";
import { greeting } from "../utils/utils";

interface GreetingProps {
  isEvening: boolean;
  time: string;
}

// const greeting = (time: string) => {
//   const hour = parseInt(time.split(":")[0]);
//   if (hour >= 5 && hour < 12) {
//     return "Good morning, it's currently";
//   } else if (hour >= 12 && hour < 18) {
//     return "Good afternoon, it's currently";
//   } else {
//     return "Good evening, it's currently";
//   }
// };

const Greeting = ({ isEvening, time }: GreetingProps) => {
  return (
    <p className="greeting">
      <img src={isEvening ? Moon : Sun} />
      {greeting(time)}
    </p>
  );
};

export default Greeting;
