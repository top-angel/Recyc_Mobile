import { View, Text, TouchableOpacity } from "react-native";
import { FC, memo } from "react";
import DollarSignIcon from "../icons/DollarSignIcon";
import CopyIcon from "../icons/CopyIcon";

const TraceRewardCard: FC = () => {
  return (
    <View className="p-4 bg-[#E3EAEF] rounded-[12px]">
      <Text
        style={{ fontFamily: "Nunito" }}
        className="text-[18px] leading-[23px] font-bold text-02-purple-mission"
      >
        Rewards
      </Text>

      <View className="bg-[#ABC0D5] p-2 rounded-[6px] flex flex-row items-center justify-center w-[180px] my-4">
        <DollarSignIcon style={{ width: 24, height: 24, color: "#1C3C59" }} />
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[14px] leading-[20px] font-bold text-[#1C3C59] ml-2"
        >
          $0.6 per item
        </Text>
      </View>

      <View className="flex flex-row items-center justify-end">
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[12px] leading-[20px] font-medium text-[#626888] mr-2"
        >
          x06fJi.....Bohr3494Knd0s
        </Text>
        <CopyIcon style={{ width: 24, height: 24, color: "#1C3C59" }} />
      </View>

      <TouchableOpacity className="mt-2">
        <View className="flex flex-row items-center justify-between bg-02-purple-mission opacity-40 py-2 px-4 rounded-[12px]">
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[18px] leading-[23px] font-bold text-[#FFFFFF]"
          >
            Collect Reward
          </Text>
          <DollarSignIcon style={{ width: 24, height: 24, color: "#FFFFFF" }} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default memo(TraceRewardCard);
