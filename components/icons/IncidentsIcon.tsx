import { memo, FC } from "react";
import { SvgXml } from "react-native-svg";

interface IProps {
  style: {
    width: number;
    height: number;
    color: string;
  };
}

const IncidentsIcon: FC<IProps> = ({ style }) => {
  const { width, height, color } = style;

  const svgMarkup = `
  <svg width=${width} height=${height} viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.15002 2V22" stroke=${color} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.15002 4H16.35C19.05 4 19.65 5.5 17.75 7.4L16.55 8.6C15.75 9.4 15.75 10.7 16.55 11.4L17.75 12.6C19.65 14.5 18.95 16 16.35 16H5.15002" stroke=${color} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

  `;

  // eslint-disable-next-line react/no-unstable-nested-components
  const SvgImage = () => <SvgXml xml={svgMarkup} />;
  return <SvgImage />;
};

export default memo(IncidentsIcon);
