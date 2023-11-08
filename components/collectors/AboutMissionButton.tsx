import { View, Text } from "react-native";
import { FC, memo } from "react";

type Props = {
  title: string;
};

const AboutMissionButton: FC<Props> = ({ title }) => {
  return (
    <View className="p-6 bg-02-purple-mission rounded-[22px]">
      <Text
        style={{ fontFamily: "Nunito" }}
        className="text-[18px] leading-[23px] font-bold text-[#FFFFFF] text-center"
      >
        {title}
      </Text>
    </View>
  );
};

export default memo(AboutMissionButton);
