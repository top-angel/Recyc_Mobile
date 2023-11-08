import { FC, memo } from "react";
import { SvgXml } from "react-native-svg";

type Props = {
  style: {
    width: number;
    height: number;
    color: string;
  };
};

const CalendarIcon: FC<Props> = ({ style }) => {
  const { width, height, color } = style;

  const svgMarkup = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.75 4H5.75C4.64543 4 3.75 4.89543 3.75 6V20C3.75 21.1046 4.64543 22 5.75 22H19.75C20.8546 22 21.75 21.1046 21.75 20V6C21.75 4.89543 20.8546 4 19.75 4Z" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.75 2V6" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.75 2V6" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.75 10H21.75" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  `;

  // eslint-disable-next-line react/no-unstable-nested-components
  const SvgImage = () => <SvgXml xml={svgMarkup} />;
  return <SvgImage />;
};

export default memo(CalendarIcon);
