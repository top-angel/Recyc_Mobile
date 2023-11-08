import { memo, FC } from "react";
import { SvgXml } from "react-native-svg";

type Props = {
  style: {
    width: number;
    height: number;
    color: string;
  };
};

const SearchIcon: FC<Props> = ({ style }) => {
  const { width, height, color } = style;

  const svgMarkup = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.58342 18.5699C4.87508 18.5699 1.04175 14.7366 1.04175 10.0282C1.04175 5.31991 4.87508 1.48657 9.58342 1.48657C14.2917 1.48657 18.1251 5.31991 18.1251 10.0282C18.1251 14.7366 14.2917 18.5699 9.58342 18.5699ZM9.58342 2.73657C5.55841 2.73657 2.29175 6.01157 2.29175 10.0282C2.29175 14.0449 5.55841 17.3199 9.58342 17.3199C13.6084 17.3199 16.8751 14.0449 16.8751 10.0282C16.8751 6.01157 13.6084 2.73657 9.58342 2.73657Z" fill="${color}"/>
<path d="M18.3333 19.4031C18.175 19.4031 18.0166 19.3448 17.8916 19.2198L16.225 17.5531C15.9833 17.3114 15.9833 16.9114 16.225 16.6698C16.4666 16.4281 16.8666 16.4281 17.1083 16.6698L18.775 18.3364C19.0166 18.5781 19.0166 18.9781 18.775 19.2198C18.65 19.3448 18.4916 19.4031 18.3333 19.4031Z" fill="${color}"/>
</svg>
  `;

  // eslint-disable-next-line react/no-unstable-nested-components
  const SvgImage = () => <SvgXml xml={svgMarkup} />;
  return <SvgImage />;
};

export default memo(SearchIcon);
