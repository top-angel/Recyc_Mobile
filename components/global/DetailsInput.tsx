import { Text } from "react-native";
import { memo, FC } from "react";

type Props = {
  title: string;
  fontWeight: "600" | "500" | "700";
  color: string;
};

const DetailsInput: FC<Props> = ({ title, fontWeight, color }) => {
  return (
    <Text
      style={{ fontFamily: "Nunito", fontWeight, color }}
      className="text-[12px] leading-[20px]"
    >
      {title}
    </Text>
  );
};

export default memo(DetailsInput);
