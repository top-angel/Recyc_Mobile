import { memo, FC } from "react";
import { SvgXml } from "react-native-svg";

const DotIcon: FC = () => {
  const svgMarkup = `
  <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="7" height="7" rx="3.5" fill="#C4C4C4" />
</svg>
  `;

  // eslint-disable-next-line react/no-unstable-nested-components
  const SvgImage = () => <SvgXml xml={svgMarkup} />;
  return <SvgImage />;
};

export default memo(DotIcon);
