import { memo, FC } from "react";
import { SvgXml } from "react-native-svg";

const SendIcon: FC = () => {
  const svgMarkup = `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 4L11 13" stroke="#1E5355" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18.0794 3.37222C19.661 2.81865 21.1813 4.339 20.6278 5.92064L16.6665 17.2386C16.0681 18.9482 13.6868 19.0454 12.9512 17.3901L11.3124 13.7029C11.1113 13.2505 10.7495 12.8887 10.2971 12.6876L6.60987 11.0488C4.95462 10.3132 5.05177 7.93188 6.76145 7.33349L18.0794 3.37222Z" stroke="#1E5355" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  `;

  // eslint-disable-next-line react/no-unstable-nested-components
  const SvgImage = () => <SvgXml xml={svgMarkup} />;
  return <SvgImage />;
};

export default memo(SendIcon);
