import { Text } from "react-native";
import { FC, memo } from "react";

type Props = {
  title: string;
  textColor: string;
};

const Subtitle: FC<Props> = ({ title, textColor }) => {
  return (
    <Text
      style={{ fontFamily: "Nunito", color: textColor }}
      className="text-[16px] leading-[24px] font-medium"
    >
      {title}
    </Text>
  );
};

export default memo(Subtitle);
