import { FC, memo } from "react";
import { SvgXml } from "react-native-svg";

interface IProps {
  style: {
    width: number;
    height: number;
    color: string;
  };
}

const AddressBookLight: FC<IProps> = ({ style }) => {
  const { width, height, color } = style;

  const svgMarkup = `
    <svg width=${width} height=${height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="12" transform="matrix(-1 0 0 1 24 0)" fill=${color} fill-opacity="0.3"/>
    <path d="M14.377 18L9.43756 13.0606C8.85423 12.4773 8.85423 11.5227 9.43756 10.9394L14.377 6" stroke=${color} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;

  // eslint-disable-next-line react/no-unstable-nested-components
  const SvgImage = () => <SvgXml xml={svgMarkup} />;
  return <SvgImage />;
};

export default memo(AddressBookLight);
