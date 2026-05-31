export const parseRouteCoordinates = (
  startParam: string | null,
  endParam: string | null
): [number, number][] => {
  if (!startParam || !endParam) {
    return [[0, 0]];
  }

  const startRaw = startParam.split(",").map(Number);
  const endRaw = endParam.split(",").map(Number);

  if (startRaw.some(isNaN) || endRaw.some(isNaN)) {
    return [[0, 0]];
  }

  const start: [number, number] = [startRaw[1], startRaw[0]];
  const end: [number, number] = [endRaw[1], endRaw[0]];

  return [start, end];
};