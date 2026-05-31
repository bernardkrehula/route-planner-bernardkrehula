export const timeCalculator = (time) => {
  if (time < 3600) {
    const calculation = time / 60;
    return `${calculation.toFixed(2)} min`;
  } else {
    const calulation = time / 60 / 60;
    return `${calulation.toFixed(2)} h`;
  }
};
