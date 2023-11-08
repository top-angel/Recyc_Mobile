import { memo, FC } from "react";
import { SvgXml } from "react-native-svg";

const StarIcon: FC = () => {
  const svgMarkup = `
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.7934 2.37401C12.0597 0.88767 9.94026 0.887671 9.20658 2.37401L7.24574 6.34647L2.85916 6.98763C1.21933 7.22732 0.565758 9.243 1.75295 10.3993L4.92548 13.4894L4.17696 17.8536C3.89673 19.4875 5.61183 20.7334 7.07908 19.9618L11 17.8998L14.9209 19.9618L15.3864 19.0767L14.9209 19.9618C16.3882 20.7334 18.1033 19.4875 17.823 17.8536L17.0745 13.4894L20.2471 10.3993C21.4342 9.243 20.7807 7.22732 19.1408 6.98763L14.7543 6.34647L12.7934 2.37401Z" stroke="#1E5355" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  `;

  // eslint-disable-next-line react/no-unstable-nested-components
  const SvgImage = () => <SvgXml xml={svgMarkup} />;
  return <SvgImage />;
};

export default memo(StarIcon);
