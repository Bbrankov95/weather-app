const convertToLocalTimeWithOffset = (time: string) => {
  if (!new Date(time)) return;
  const timeZoneOffset = new Date().getTimezoneOffset() * 60 * 1000;
  return new Date(new Date(time).getTime() - timeZoneOffset).toLocaleTimeString(
    [],
    { hour12: false, timeStyle: "short" }
  );
};

export default convertToLocalTimeWithOffset;
