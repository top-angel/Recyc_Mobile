import { memo, FC } from "react";
import { SvgXml } from "react-native-svg";

type Props = {
  style: {
    width: number;
    height: number;
    color: string;
  };
};

const MapIcon: FC<Props> = ({ style }) => {
  const { width, height, color } = style;

  const svgMarkup = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 6V22L8 18L16 22L23 18V2L16 6L8 2L1 6Z" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 2V18" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16 6V22" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  `;

  // eslint-disable-next-line react/no-unstable-nested-components
  const SvgImage = () => <SvgXml xml={svgMarkup} />;
  return <SvgImage />;
};

export default memo(MapIcon);
