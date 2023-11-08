import { FC, memo } from "react";
import { SvgXml } from "react-native-svg";

type Props = {
  style: {
    width: number;
    height: number;
    color: string;
  };
};

const BottleIcon: FC<Props> = ({ style }) => {
  const { width, height, color } = style;

  const svgMarkup = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.14831 11.4111C9.14267 11.3999 8.75819 10.6413 8.39022 9.90342C8.13252 9.38669 7.9984 8.81796 7.97145 8.24117C7.87734 6.2266 7.6353 4.80639 7.40281 3.86258C7.23673 3.1883 7.31034 2.45681 7.20001 1.77121C7.18472 1.67556 7.1744 1.58513 7.16457 1.50113C7.12196 1.13626 6.99257 0.0259757 5.81322 0.000121382C5.80655 0.000121382 5.79999 0 5.79332 0H3.45319C3.44652 0 3.43996 0.000121382 3.43329 0.000242764C2.25394 0.0259757 2.12455 1.13638 2.08194 1.50125C2.07211 1.58513 2.06179 1.67568 2.04638 1.77145C1.93623 2.45699 2.00989 3.18842 1.84381 3.8626C1.6113 4.80638 1.36928 6.22643 1.27527 8.24067C1.24834 8.81779 1.1141 9.38682 0.856247 9.90384C0.488334 10.6415 0.104079 11.3999 0.0984408 11.4111C0.0337443 11.5387 0 11.6796 0 11.8227V23.0895C0 23.5923 0.40748 23.9999 0.910365 23.9999H8.33627C8.83915 23.9999 9.24663 23.5923 9.24663 23.0895V11.8227C9.24663 11.6797 9.21301 11.5388 9.14831 11.4111ZM2.97094 9.73192C3.02824 9.61333 3.05907 9.48381 3.06137 9.35211C3.13906 4.95335 3.95438 3.21674 3.97769 3.16843C3.98036 3.16321 3.9823 3.15787 3.98485 3.15253C3.99371 3.1342 4.0022 3.11575 4.00973 3.09706C4.01337 3.08783 4.01701 3.07873 4.02041 3.06939C4.02684 3.05178 4.03279 3.03406 4.03813 3.01622C4.04129 3.00554 4.04445 2.99498 4.04724 2.98417C4.05136 2.96803 4.05488 2.95164 4.05828 2.93538C4.06071 2.92324 4.06326 2.91122 4.06532 2.89909C4.06775 2.88403 4.06921 2.86886 4.07091 2.85381C4.07236 2.8407 4.07394 2.82759 4.07491 2.81436C4.07588 2.79967 4.07576 2.78499 4.076 2.7703C4.07625 2.75707 4.07698 2.74384 4.07661 2.73061C4.07588 2.70354 4.07406 2.67659 4.07079 2.64977C4.06981 2.64176 4.06812 2.63387 4.06702 2.62586C4.06411 2.60595 4.06108 2.58604 4.05695 2.56626C4.05501 2.55764 4.05258 2.54914 4.05039 2.54052C4.0459 2.52171 4.04117 2.5029 4.03534 2.48445C4.03279 2.47583 4.02939 2.46733 4.02648 2.45871C4.02029 2.44075 4.01386 2.42278 4.00645 2.40506C4.00281 2.3962 3.99868 2.38758 3.99456 2.37884C3.98691 2.36209 3.97914 2.34558 3.97052 2.3292C3.96555 2.31973 3.96021 2.31063 3.95499 2.3014C3.94649 2.28659 3.93763 2.27203 3.92816 2.25758C3.92136 2.24727 3.91445 2.23719 3.90716 2.22712C3.89842 2.21473 3.88944 2.2026 3.87985 2.1907C3.87099 2.17941 3.86177 2.16837 3.8523 2.15756C3.85151 2.15666 3.85073 2.15574 3.84998 2.15483C3.84357 2.14708 3.83971 2.13535 3.83878 2.12534C3.83848 2.12209 3.83857 2.12084 3.83875 2.11758C3.83904 2.11228 3.83939 2.10503 3.83957 2.10025C3.83965 2.09808 3.83986 2.09593 3.84016 2.09378C3.84138 2.08522 3.84367 2.06651 3.8442 2.06059C3.8443 2.05951 3.84412 2.05951 3.84392 2.06058C3.86585 1.92402 3.9813 1.82073 4.11962 1.82073H5.12679C5.26502 1.82073 5.38047 1.92395 5.40222 2.06046C5.40999 2.10868 5.38857 2.15481 5.35854 2.19333C5.15991 2.44812 5.10613 2.79717 5.24151 3.10859C5.24673 3.12122 5.25268 3.13372 5.25863 3.1461C5.26215 3.15314 5.26482 3.16042 5.26846 3.16746C5.27672 3.18433 6.1066 4.91221 6.18526 9.35223C6.18769 9.48381 6.2184 9.61333 6.27569 9.73192C6.46313 10.1202 6.74698 10.6901 6.99682 11.1881C7.27802 11.7487 7.4259 12.3668 7.4259 12.9939V19.3767C7.4259 20.9245 6.17114 22.1793 4.62332 22.1793C3.07549 22.1793 1.82073 20.9245 1.82073 19.3767V12.9939C1.82073 12.3668 1.9686 11.7487 2.24979 11.1881C2.4996 10.69 2.78344 10.1202 2.97094 9.73192Z" fill="${color}"/>
</svg>
  `;

  // eslint-disable-next-line react/no-unstable-nested-components
  const SvgImage = () => <SvgXml xml={svgMarkup} />;
  return <SvgImage />;
};

export default memo(BottleIcon);
