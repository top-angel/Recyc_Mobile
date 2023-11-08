import { View, Text } from "react-native";
import { FC, memo } from "react";
import { useAppSelector } from "redux/hooks";

const AboutMissionContent: FC = () => {
  const { result } = useAppSelector((state) => state.missionQueryPublic);

  return (
    <View className="flex-1 bg-white rounded-t-[20px] z-20 p-4 -mt-7">
      <View className="flex flex-row items-center justify-between mt-4">
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[14px] leading-[20px] font-medium text-[#425D7E]"
        >
          {result[0]?.company_name}
        </Text>
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[14px] leading-[20px] font-medium text-[#425D7E]"
        >
          0/{result[0]?.image_count}
        </Text>
      </View>

      <Text
        style={{ fontFamily: "Nunito" }}
        className="text-[14px] leading-[20px] font-bold text-[#425D7E] text-right mt-2"
      >
        Available worldwide
      </Text>

      <Text
        style={{ fontFamily: "Nunito" }}
        className="text-[14px] leading-[20px] font-bold text-[#425D7E] mt-8"
      >
        Mission Description{" "}
        <Text className="font-normal">{result[0]?.bounty_description}</Text>
      </Text>
    </View>
  );
};

export default memo(AboutMissionContent);
