import { View, Text } from "react-native";
import { memo, FC, ReactElement } from "react";

type Props = {
  title: string;
  rightIcon: ReactElement<any, any>;
};

const PublicMissionButton: FC<Props> = ({ title, rightIcon }) => {
  return (
    <View className="p-4 bg-[#2E62974D] rounded-[12px] flex flex-row items-center justify-between">
      <Text
        style={{ fontFamily: "Nunito" }}
        className="text-[18px] leading-[23px] font-bold text-02-purple-mission"
      >
        {title}
      </Text>
      {rightIcon}
    </View>
  );
};

export default memo(PublicMissionButton);
