import { memo, FC } from "react";
import { SvgXml } from "react-native-svg";

interface IProps {
  style: {
    width: number;
    height: number;
    color: string;
  };
}

const SlidersIcon: FC<IProps> = ({ style }) => {
  const { width, height, color } = style;

  const svgMarkup = `
  <svg width="${width}" height="${height}" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 21.5151V14.5151" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4 10.5151V3.51514" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 21.5151V12.5151" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 8.51514V3.51514" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20 21.5151V16.5151" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20 12.5151V3.51514" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M1 14.5151H7" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9 8.51514H15" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17 16.5151H23" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  `;

  // eslint-disable-next-line react/no-unstable-nested-components
  const SvgImage = () => <SvgXml xml={svgMarkup} />;
  return <SvgImage />;
};

export default memo(SlidersIcon);
