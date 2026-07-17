import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

export const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const restoredRef = useRef(false);
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const stored = window.localStorage.getItem(key);
      if (!stored) {
        return initialValue;
      }

      restoredRef.current = true;
      return JSON.parse(stored) as T;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // localStorage can fail in private browsing or restricted environments.
    }
  }, [key, value]);

  return [value, setValue as Dispatch<SetStateAction<T>>, restoredRef.current] as const;
};
