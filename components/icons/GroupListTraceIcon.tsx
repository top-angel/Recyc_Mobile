import { memo, FC } from "react";
import { SvgXml } from "react-native-svg";

const GroupListTraceIcon: FC = () => {
  const svgMarkup = `
  <svg width="29" height="386" viewBox="0 0 29 386" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M29 7.33492C29 11.3859 12.4183 14.6698 8 14.6698C3.58172 14.6698 0 11.3859 0 7.33492C0 3.28395 3.58172 0 8 0C12.4183 0 29 3.28395 29 7.33492Z" fill="#1C3C59"/>
<path d="M29 193.458C29 197.509 12.4183 200.793 8 200.793C3.58172 200.793 0 197.509 0 193.458C0 189.407 3.58172 186.123 8 186.123C12.4183 186.123 29 189.407 29 193.458Z" fill="#1C3C59"/>
<path d="M29 379.123C29 382.92 12.4183 385.999 8 385.999C3.58172 385.999 0 382.92 0 379.123C0 375.325 3.58172 372.246 8 372.246C12.4183 372.246 29 375.325 29 379.123Z" fill="#1C3C59"/>
<path d="M8 10.0859V195.293" stroke="#1C3C59" stroke-dasharray="10 10"/>
<path d="M8 196.209V381.416" stroke="#1C3C59" stroke-dasharray="10 10"/>
</svg>
  `;

  // eslint-disable-next-line react/no-unstable-nested-components
  const SvgImage = () => <SvgXml xml={svgMarkup} />;
  return <SvgImage />;
};

export default memo(GroupListTraceIcon);
