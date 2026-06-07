export const filterSuggestions = (rawSuggestions) => {
  let suggestions = [];

  rawSuggestions.map((suggest) => {
    const value = suggest.oh.Bi.flatMap((value) => ({locationId: value[1], location: value[2][0]}));
    suggestions.push(value);
  });
  return suggestions.flatMap((value) => value);
};
