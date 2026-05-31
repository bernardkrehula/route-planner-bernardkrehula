import axios from "axios";

export const requestRoute = async (cord, travelOption) => {
  const startParam = `${cord[0][1]},${cord[0][0]}`;
  const endParam = `${cord[1][1]},${cord[1][0]}`;
  const apiKey =
    "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjJiMmQ0ZTllYmNkNDQ2ZWVhYTZhOWE0Yzc5Mzc0N2FhIiwiaCI6Im11cm11cjY0In0";
  try {
    const response = await axios.get(
      `https://api.openrouteservice.org/v2/directions/${travelOption}?api_key=${apiKey}=&start=${startParam}&end=${endParam}`,
    );
    return response.data.features[0];
  } catch (error) {
    console.error(error);
  }
};
