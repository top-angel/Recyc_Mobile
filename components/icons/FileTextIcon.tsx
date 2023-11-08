import { memo, FC } from "react";
import { SvgXml } from "react-native-svg";

interface IProps {
  style: {
    width: number;
    height: number;
    color: string;
  };
}

const FileTextIcon: FC<IProps> = ({ style }) => {
  const { width, height, color } = style;

  const svgMarkup = `
  <svg width="${width}" height="${height}" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14 2.51514H6C5.46957 2.51514 4.96086 2.72585 4.58579 3.10092C4.21071 3.476 4 3.9847 4 4.51514V20.5151C4 21.0456 4.21071 21.5543 4.58579 21.9293C4.96086 22.3044 5.46957 22.5151 6 22.5151H18C18.5304 22.5151 19.0391 22.3044 19.4142 21.9293C19.7893 21.5543 20 21.0456 20 20.5151V8.51514L14 2.51514Z" stroke="#425D7E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14 2.51514V8.51514H20" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16 13.5151H8" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16 17.5151H8" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 9.51514H9H8" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  `;

  // eslint-disable-next-line react/no-unstable-nested-components
  const SvgImage = () => <SvgXml xml={svgMarkup} />;
  return <SvgImage />;
};

export default memo(FileTextIcon);
