import { View, Text } from "react-native";
import { memo, FC } from "react";

type Props = {
  textLeft: string;
  textRight: string;
  textColor: string;
};

const MissionItemTitle: FC<Props> = ({ textLeft, textRight, textColor }) => {
  return (
    <View className="flex flex-row items-center justify-between">
      <Text
        style={{ fontFamily: "Nunito", color: textColor }}
        className="text-[22px] leading-[36px] font-bold"
      >
        {textLeft}
      </Text>
      <Text
        style={{ fontFamily: "Nunito", color: textColor }}
        className="text-[16px] leading-[36px] font-medium"
      >
        {textRight}
      </Text>
    </View>
  );
};

export default memo(MissionItemTitle);
