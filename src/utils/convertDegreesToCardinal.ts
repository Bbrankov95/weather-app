const degreesToCardinal = (degrees: number) => {
  const cardinals = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round((degrees % 360) / 45);
  return cardinals[index % 8];
};

export default degreesToCardinal;
