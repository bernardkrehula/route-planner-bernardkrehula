export const requestCordinates = async (destination: string) => {
  const { Place } = await google.maps.importLibrary("places");

  const request = {
    textQuery: {destination},
    fields: ["location", "formattedAddress"],
    includedType: "", 
    useStrictTypeFiltering: true,
  };

  const { places } = await Place.searchByText(request);

  return places[0];
};
