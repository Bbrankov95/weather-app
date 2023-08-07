const convertToLocalTimeWithOffset = (time: string): string => {
  const timeZoneOffset = new Date().getTimezoneOffset() * 60 * 1000;
  const timeResolved = new Date(
    new Date(time).getTime() - timeZoneOffset
  ).toLocaleTimeString([], {
    hour12: false,
    timeStyle: "short",
  });
  return timeResolved !== "Invalid Date" ? timeResolved : "00:00";
};

export default convertToLocalTimeWithOffset;
