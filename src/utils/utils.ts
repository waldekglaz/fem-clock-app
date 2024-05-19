export const greeting = (time: string) => {
  const hour = parseInt(time.split(":")[0]);
  if (hour >= 5 && hour < 12) {
    return "Good morning, it's currently";
  } else if (hour >= 12 && hour < 18) {
    return "Good afternoon, it's currently";
  } else {
    return "Good evening, it's currently";
  }
};

export const extractLocation = (locationStr: string) => {
  const location = locationStr.split("/");
  return location[location.length - 1];
};

export const day_of_week = (day: number | undefined) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  if (day === undefined) return "";
  return days[day];
};
export const getCurrentTime = (): string => {
  const now = new Date();
  let hours: number | string = now.getHours();
  let minutes: number | string = now.getMinutes();

  hours = hours < 10 ? `0${hours}` : hours.toString();
  minutes = minutes < 10 ? `0${minutes}` : minutes.toString();

  return `${hours}:${minutes}`;
};
