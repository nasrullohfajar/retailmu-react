import { useSyncExternalStore } from "react";

export const useIsMobile = (width: number = 768): boolean => {
  const query = `(max-width: ${width}px)`;

  const handleChange = (callback: () => void) => {
    const mediaQuery = window.matchMedia(query);
    mediaQuery.addEventListener("change", callback);

    return () => mediaQuery.removeEventListener("change", callback);
  };

  const getSnapshot = () => {
    return window.matchMedia(query).matches;
  };

  const getServerSnapshot = () => {
    return false;
  };

  return useSyncExternalStore(handleChange, getSnapshot, getServerSnapshot);
};
