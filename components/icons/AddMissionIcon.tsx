import { memo, FC } from "react";
import { SvgXml } from "react-native-svg";

const AddMissionIcon: FC = () => {
  const svgMarkup = `
  <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3608_29800)">
<path opacity="0.4" d="M14.19 0.5H5.81C2.17 0.5 0 2.67 0 6.31V14.68C0 18.33 2.17 20.5 5.81 20.5H14.18C17.82 20.5 19.99 18.33 19.99 14.69V6.31C20 2.67 17.83 0.5 14.19 0.5Z" fill="white"/>
<path d="M14 9.75H10.75V6.5C10.75 6.09 10.41 5.75 10 5.75C9.59 5.75 9.25 6.09 9.25 6.5V9.75H6C5.59 9.75 5.25 10.09 5.25 10.5C5.25 10.91 5.59 11.25 6 11.25H9.25V14.5C9.25 14.91 9.59 15.25 10 15.25C10.41 15.25 10.75 14.91 10.75 14.5V11.25H14C14.41 11.25 14.75 10.91 14.75 10.5C14.75 10.09 14.41 9.75 14 9.75Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_3608_29800">
<rect width="20" height="20" fill="white" transform="translate(0 0.5)"/>
</clipPath>
</defs>
</svg>
  `;

  // eslint-disable-next-line react/no-unstable-nested-components
  const SvgImage = () => <SvgXml xml={svgMarkup} />;
  return <SvgImage />;
};

export default memo(AddMissionIcon);
