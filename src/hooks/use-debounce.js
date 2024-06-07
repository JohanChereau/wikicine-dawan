import { useEffect, useState } from 'react';

export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const cleanValue = value.replace(/\s+/g, '');
    const timeout = setTimeout(() => {
      setDebouncedValue(cleanValue);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};
