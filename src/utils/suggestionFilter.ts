export const filterSuggestions = (rawSuggestions) => {
  let suggestions = [];
  let locationToken;

  rawSuggestions.map((suggest) => {
    locationToken = suggest.CD.token;
    const value = suggest.oh.Bi.flatMap((value) => ({
      locationId: value[1],
      location: value[2][0],
    }));
    suggestions.push(value);
  });
  const filteredSuggestions = suggestions.flatMap((value) => value);
  return filteredSuggestions;
};
