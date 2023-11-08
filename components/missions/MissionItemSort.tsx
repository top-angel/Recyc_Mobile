import { View, Text, TouchableOpacity } from "react-native";
import { memo, FC } from "react";
import ArrowDownIcon from "../icons/ArrowDownIcon";

type Props = {
  backgroundRight: string;
  textColor: string;
};

const MissionItemSort: FC<Props> = ({ backgroundRight, textColor }) => {
  return (
    <View className="flex flex-row items-center justify-between">
      <Text
        style={{ fontFamily: "Nunito", color: textColor }}
        className="text-[16px] leading-[36px] font-medium"
      >
        Sort By
      </Text>
      <TouchableOpacity>
        <View
          className="flex flex-row items-center rounded-[8px] px-3 py-2"
          style={{ backgroundColor: backgroundRight }}
        >
          <Text
            style={{ fontFamily: "Nunito", color: textColor }}
            className="text-[16px] leading-[36px] font-medium mr-2"
          >
            Most Collected
          </Text>
          <ArrowDownIcon style={{ width: 24, height: 25, color: textColor }} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default memo(MissionItemSort);
