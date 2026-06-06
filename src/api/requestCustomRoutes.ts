import axios from "axios";

export const requestCustomRoute = async () => {
  const coordinates = [
    [8.681495, 49.41461],
    [8.686507, 49.41943],
    [8.687872, 49.420318],
  ];

  const apiKey =
    "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjJiMmQ0ZTllYmNkNDQ2ZWVhYTZhOWE0Yzc5Mzc0N2FhIiwiaCI6Im11cm11cjY0In0";
  try {
    const response = await axios.post(
      `https://api.openrouteservice.org/v2/directions/driving-car/geojson`,
      { coordinates },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": apiKey,
        },
      },
    );
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
//Nece raditi zbog CORS
//Cross origin resource sharing
//Ako su razliciti orgini server blokira api request