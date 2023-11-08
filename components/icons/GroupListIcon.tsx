import { memo, FC } from "react";
import { SvgXml } from "react-native-svg";

const GroupListIcon: FC = () => {
  const svgMarkup = `
  <svg width="29" height="408" viewBox="0 0 29 408" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M29 7.82002C29 11.871 12.4183 15.1549 8 15.1549C3.58172 15.1549 0 11.871 0 7.82002C0 3.76906 3.58172 0.485107 8 0.485107C12.4183 0.485107 29 3.76906 29 7.82002Z" fill="#394E50"/>
<path d="M29 201.335C29 205.386 12.4183 208.67 8 208.67C3.58172 208.67 0 205.386 0 201.335C0 197.284 3.58172 194 8 194C12.4183 194 29 197.284 29 201.335Z" fill="#394E50"/>
<path d="M29 400.876C29 404.674 12.4183 407.753 8 407.753C3.58172 407.753 0 404.674 0 400.876C0 397.079 3.58172 394 8 394C12.4183 394 29 397.079 29 400.876Z" fill="#394E50"/>
<path d="M8 10.5706V195.777" stroke="#394E50" stroke-dasharray="10 10"/>
<path d="M8 197L7.99999 394" stroke="#394E50" stroke-dasharray="10 10"/>
</svg>
  `;

  // eslint-disable-next-line react/no-unstable-nested-components
  const SvgImage = () => <SvgXml xml={svgMarkup} />;
  return <SvgImage />;
};

export default memo(GroupListIcon);
