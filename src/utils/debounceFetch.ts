import debounce from "debounce";

export const debouncedFetch = debounce((destination: string, fetchFn: (val: string) => void) => {
  fetchFn(destination);
}, 1000);