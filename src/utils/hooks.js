import { useState, useEffect } from 'react';

const SCREEN_SM = 510;
// const SCREEN_MD = 768;

/**
 * Custom hook that tracks the window width and provides screen size flags based on breakpoints.
 *
 * @returns {Object} An object containing the window width and screen size flags.
 */
const useResize = () => {
  const [width, setWidth] = useState(window.innerWidth); // State variable to hold the window width

  useEffect(() => {
    const handleResize = (event) => {
      setWidth(event.target.innerWidth); // Update width state on window resize
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener when component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures useEffect runs only once after initial render

  // Return an object containing window width and screen size flags based on breakpoints
  return {
    width,
    isScreenSm: width <= SCREEN_SM,
    // isScreenMd: width <= SCREEN_MD,
  };
};

export default useResize;