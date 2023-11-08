import { memo, FC } from "react";
import { SvgXml } from "react-native-svg";

interface IProps {
  style: {
    width: number;
    height: number;
    color: string;
  };
}

const CopyIcon: FC<IProps> = ({ style }) => {
  const { width, height, color } = style;

  const svgMarkup = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_415_18676)">
<path d="M13.3333 6H7.33333C6.59695 6 6 6.59695 6 7.33333V13.3333C6 14.0697 6.59695 14.6667 7.33333 14.6667H13.3333C14.0697 14.6667 14.6667 14.0697 14.6667 13.3333V7.33333C14.6667 6.59695 14.0697 6 13.3333 6Z" stroke="${color}" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.33325 9.99992H2.66659C2.31296 9.99992 1.97382 9.85944 1.72378 9.60939C1.47373 9.35935 1.33325 9.02021 1.33325 8.66659V2.66659C1.33325 2.31296 1.47373 1.97382 1.72378 1.72378C1.97382 1.47373 2.31296 1.33325 2.66659 1.33325H8.66659C9.02021 1.33325 9.35935 1.47373 9.60939 1.72378C9.85944 1.97382 9.99992 2.31296 9.99992 2.66659V3.33325" stroke="${color}" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_415_18676">
<rect width="${width}" height="${height}" fill="${color}"/>
</clipPath>
</defs>
</svg>
  `;

  // eslint-disable-next-line react/no-unstable-nested-components
  const SvgImage = () => <SvgXml xml={svgMarkup} />;
  return <SvgImage />;
};

export default memo(CopyIcon);
