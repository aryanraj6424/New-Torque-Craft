import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Ye line page ko top pe bhej degi har route change par
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;