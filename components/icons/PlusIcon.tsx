import { memo, FC } from "react";
import { SvgXml } from "react-native-svg";

const PlusIcon: FC = () => {
  const svgMarkup = `
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.4" d="M14.19 0H5.81C2.17 0 0 2.17 0 5.81V14.18C0 17.83 2.17 20 5.81 20H14.18C17.82 20 19.99 17.83 19.99 14.19V5.81C20 2.17 17.83 0 14.19 0Z" fill="white"/>
<path d="M14 9.25H10.75V6C10.75 5.59 10.41 5.25 10 5.25C9.59 5.25 9.25 5.59 9.25 6V9.25H6C5.59 9.25 5.25 9.59 5.25 10C5.25 10.41 5.59 10.75 6 10.75H9.25V14C9.25 14.41 9.59 14.75 10 14.75C10.41 14.75 10.75 14.41 10.75 14V10.75H14C14.41 10.75 14.75 10.41 14.75 10C14.75 9.59 14.41 9.25 14 9.25Z" fill="white"/>
</svg>

  `;

  // eslint-disable-next-line react/no-unstable-nested-components
  const SvgImage = () => <SvgXml xml={svgMarkup} />;
  return <SvgImage />;
};

export default memo(PlusIcon);

