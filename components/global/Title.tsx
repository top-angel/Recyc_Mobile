import { Text } from "react-native";
import { memo, FC } from "react";

type Props = {
  title: string;
  textColor: string;
};

const Title: FC<Props> = ({ title, textColor }) => {
  return (
    <Text
      style={{ fontFamily: "Nunito", color: textColor }}
      className="text-[22px] leading-[36px] font-bold"
    >
      {title}
    </Text>
  );
};

export default memo(Title);
