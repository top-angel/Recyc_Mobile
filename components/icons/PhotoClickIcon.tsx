import { memo, FC } from "react";
import { SvgXml } from "react-native-svg";

const PhotoClickIcon: FC = () => {
  const svgMarkup = `
  <svg width="71" height="70" viewBox="0 0 71 70" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="35.5" cy="35" r="35" fill="white"/>
<circle cx="35.5" cy="35" r="28" fill="white" stroke="black" stroke-width="2"/>
</svg>

  `;

  // eslint-disable-next-line react/no-unstable-nested-components
  const SvgImage = () => <SvgXml xml={svgMarkup} />;
  return <SvgImage />;
};

export default memo(PhotoClickIcon);
