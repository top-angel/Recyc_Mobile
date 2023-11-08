import { memo, FC } from "react";
import { SvgXml } from "react-native-svg";

interface IProps {
  style: {
    width: number;
    height: number;
    color: string;
  };
}

const LineIcon: FC<IProps> = ({ style }) => {
  const { width, height, color } = style;

  const svgMarkup = `
  <svg width=${width} height=${height} viewBox="0 0 33 7" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width=${width} height=${height} rx="3.5" fill=${color}/>
</svg>
  `;

  // eslint-disable-next-line react/no-unstable-nested-components
  const SvgImage = () => <SvgXml xml={svgMarkup} />;
  return <SvgImage />;
};

export default memo(LineIcon);
