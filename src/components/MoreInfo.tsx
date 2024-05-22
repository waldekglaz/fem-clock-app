import CategoryItem from "./CategoryItem";
import { day_of_week } from "../utils/utils";

interface MoreInfoProps {
  isMoreInfoOpen: boolean;
  timeData: any;
  setIsMoreInfoOpen: (isMoreInfoOpen: boolean) => void;
  isEvening: boolean;
}

const MoreInfo = ({
  isMoreInfoOpen,
  timeData,
  setIsMoreInfoOpen,
  isEvening,
}: MoreInfoProps) => {
  return (
    <div
      onClick={() => setIsMoreInfoOpen(false)}
      className={`more-info ${!isMoreInfoOpen ? "hidden" : null} ${
        isEvening ? "evening" : "daytime"
      }`}
    >
      <div className="wrapper">
        <div className="categories">
          <CategoryItem title="Current timezone" value={timeData?.timezone} />
          <CategoryItem title="Day of the year" value={timeData?.day_of_year} />
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
  );
};

export default MoreInfo;
