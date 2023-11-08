import { View, Text, TouchableOpacity } from "react-native";
import { memo, FC } from "react";
import moment from "moment";

type Props = {
  category: string;
  value: number;
  detail: string;
};

const CollectorSubtitleCategory: FC<Props> = ({ category, value, detail }) => {
  if (category === "Collector") {
    return (
      <View className="flex-row rounded-full bg-[#2E6297]/[0.3] px-3 py-[6px] items-center justify-center mr-4">
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[12px] font-bold text-[#2E6297]"
        >
          {value}
        </Text>
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[12px] font-medium text-[#2E6297] ml-1"
        >
          {detail}
        </Text>
      </View>
    );
  }
  return (
    <View className="flex-row rounded-full bg-[#00B0AD]/[0.3] px-3 py-[6px] items-center justify-center mr-4">
      <Text
        style={{ fontFamily: "Nunito" }}
        className="text-[12px] font-bold text-[#1E5355]"
      >
        {value}
      </Text>
      <Text
        style={{ fontFamily: "Nunito" }}
        className="text-[12px] font-medium text-[#1E5355] ml-1"
      >
        {detail}
      </Text>
    </View>
  );
};

export default memo(CollectorSubtitleCategory);
