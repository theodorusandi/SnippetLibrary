import useWindowDimensions from "./useScreenWidth";

const useScreenSize = () => {
  const {width} = useWindowDimensions();

  return {
    isSm: width <= 600,
  };
}

export default useScreenSize;