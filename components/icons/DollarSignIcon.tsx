import { memo, FC } from "react";
import { SvgXml } from "react-native-svg";

type Props = {
  style: {
    width: number;
    height: number;
    color: string;
  };
};

const DollarSignIcon: FC<Props> = ({ style }) => {
  const { width, height, color } = style;

  const svgMarkup = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_415_18817)">
<path d="M12 0.999878V22.9999" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17 4.99988H9.5C8.57174 4.99988 7.6815 5.36863 7.02513 6.025C6.36875 6.68138 6 7.57162 6 8.49988C6 9.42814 6.36875 10.3184 7.02513 10.9748C7.6815 11.6311 8.57174 11.9999 9.5 11.9999H14.5C15.4283 11.9999 16.3185 12.3686 16.9749 13.025C17.6313 13.6814 18 14.5716 18 15.4999C18 16.4281 17.6313 17.3184 16.9749 17.9748C16.3185 18.6311 15.4283 18.9999 14.5 18.9999H6" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_415_18817">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>
  `;

  // eslint-disable-next-line react/no-unstable-nested-components
  const SvgImage = () => <SvgXml xml={svgMarkup} />;
  return <SvgImage />;
};

export default memo(DollarSignIcon);
