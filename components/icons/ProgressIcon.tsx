import { memo, FC } from "react";
import { SvgXml } from "react-native-svg";

type Props = {
  color: string;
};

const ProgressIcon: FC<Props> = ({ color }) => {
  const svgMarkup = `
  <svg width="330" height="10" viewBox="0 0 330 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="330" height="10" rx="5" fill="#E3E3E3"/>
<rect width="212" height="10" rx="5" fill="${color}"/>
</svg>
  `;

  // eslint-disable-next-line react/no-unstable-nested-components
  const SvgImage = () => <SvgXml xml={svgMarkup} />;
  return <SvgImage />;
};

export default memo(ProgressIcon);
