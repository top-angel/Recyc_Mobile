import { memo, FC } from "react";
import { SvgXml } from "react-native-svg";

interface IProps {
  style: {
    width: number;
    height: number;
    color: string;
  };
}

const ListIcon: FC<IProps> = ({ style }) => {
  const { width, height, color } = style;

  const svgMarkup = `
  <svg width="${width}" height="${height}" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 6.51514H21" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 12.5151H21" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 18.5151H21" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3 6.51514H3.01" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3 12.5151H3.01" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3 18.5151H3.01" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  `;

  // eslint-disable-next-line react/no-unstable-nested-components
  const SvgImage = () => <SvgXml xml={svgMarkup} />;
  return <SvgImage />;
};

export default memo(ListIcon);
