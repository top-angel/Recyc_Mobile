import { Text } from "react-native";
import { memo, FC } from "react";

type Props = {
  title: string;
};

const StorerSubtitle: FC<Props> = ({ title }) => {
  return (
    <Text
      style={{ fontFamily: "Nunito" }}
      className="text-[16px] leading-[24px] font-medium text-[#FFFFFF]"
    >
      {title}
    </Text>
  );
};

export default memo(StorerSubtitle);
