import { useState, useEffect } from "react";

const useSizeUnder = (breakpoint = 560) => {
  const [isUnder, setIsUnder] = useState(window.innerWidth < breakpoint);

  useEffect(() => {
    const handleResize = () => {
      setIsUnder(window.innerWidth < breakpoint);
    };

    window.addEventListener("resize", handleResize);

    // Nettoyage
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoint]);

  return isUnder;
};

export default useSizeUnder;
