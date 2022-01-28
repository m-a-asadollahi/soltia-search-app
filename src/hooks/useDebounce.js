import { useEffect, useState } from "react";

export const useDebounce = (value, delay) => {
  //State and its setter
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    //update value after delay
    const delayHandler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(delayHandler);
    };
  }, [value, delay]);

  return debouncedValue;
};
