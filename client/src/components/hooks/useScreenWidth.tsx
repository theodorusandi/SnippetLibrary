import { useState, useEffect } from "react";
import { debounce } from "../../utils/Common";

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const debouncedHandleResize = debounce(() => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    });
    window.addEventListener("resize", debouncedHandleResize);
    return () => window.removeEventListener("resize", debouncedHandleResize);
  }, []);

  return windowDimensions;
};

export default useWindowDimensions;
