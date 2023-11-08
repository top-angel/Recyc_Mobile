import { memo, FC } from "react";
import { SvgXml } from "react-native-svg";

const CollectorIcon: FC = () => {
  const svgMarkup = `
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path opacity="0.4" d="M15.9999 16.0013C19.6818 16.0013 22.6666 13.0165 22.6666 9.33463C22.6666 5.65274 19.6818 2.66797 15.9999 2.66797C12.318 2.66797 9.33325 5.65274 9.33325 9.33463C9.33325 13.0165 12.318 16.0013 15.9999 16.0013Z" fill="#2E6297"/>
  <path d="M15.9999 19.332C9.31988 19.332 3.87988 23.812 3.87988 29.332C3.87988 29.7054 4.17322 29.9987 4.54655 29.9987H27.4532C27.8265 29.9987 28.1199 29.7054 28.1199 29.332C28.1199 23.812 22.6799 19.332 15.9999 19.332Z" fill="#2E6297"/>
  </svg>  
  `;

  // eslint-disable-next-line react/no-unstable-nested-components
  const SvgImage = () => <SvgXml xml={svgMarkup} />;
  return <SvgImage />;
};

export default memo(CollectorIcon);
