import axios from "axios";

export const requestRoute = async () => {
  const cords = {
    start: [46.334298, 16.273321],
    end: [46.305979, 16.335594],
  };
  const startParam = `${cords.start[1]},${cords.start[0]}`;
  const endParam = `${cords.end[1]},${cords.end[0]}`;
  const apiKey =
    "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjJiMmQ0ZTllYmNkNDQ2ZWVhYTZhOWE0Yzc5Mzc0N2FhIiwiaCI6Im11cm11cjY0In0";
  try {
    const response = await axios.get(
      `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}=&start=${startParam}&end=${endParam}`,
    );
    const rawCoordinates = response.data.features[0].geometry.coordinates;
    const leafletReadyRoute = rawCoordinates.map(([lng, lat]) => [lat, lng]);
    console.log(leafletReadyRoute)
    return leafletReadyRoute;
  } catch (error) {
    console.error(error);
  }
};

