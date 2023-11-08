import { View, Text } from "react-native";
import { memo, FC, useMemo, useState } from "react";
import moment from "moment";
import { useAppSelector } from "redux/hooks";

type Props = {
  totalReturns: number;
};

const StorerBountyDetailsCard: FC<Props> = ({ totalReturns }) => {
  const [stored] = useState(0);

  const { result } = useAppSelector((state) => state.missionQueryPublic);

  // Calculate total difference between end and start date in seconds
  let diffInSeconds = moment(result[0]?.end_date).diff(
    moment(result[0]?.start_date),
    "seconds",
  );

  // Calucate days and subtract total seconds
  const days = Math.floor(diffInSeconds / 86400);
  diffInSeconds -= days * 86400;

  // Calculate total hours and subtract total seconds
  const hours = Math.floor(diffInSeconds / 3600) % 24;
  diffInSeconds -= hours * 3600;

  // Calculate total minutes
  const minutes = Math.round(Math.floor(diffInSeconds / 60) % 60);

  const returns = useMemo(
    () => (result.length > 0 ? totalReturns / result[0].image_count : 0),
    [result, totalReturns],
  );

  return (
    <View className="p-4 border border-[#9ea9e154] rounded-[12px] bg-[#FFFFFF]">
      <View className="flex flex-row items-center justify-between">
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[14px] leading-[20px] font-medium text-[#23262F]"
        >
          {result[0]?.bounty_name ? result[0]?.bounty_name : `Coca-Cola 330ml cans` }
        </Text>
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[12px] leading-[20px] font-medium text-[#23262F]"
        >
          Worldwide
        </Text>
      </View>

      <View className="flex flex-row items-center justify-between mt-1">
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[12px] leading-[20px] font-medium text-[#777E91]"
        >
          {result[0]?.company_name ? result[0]?.company_name : `Coca-Cola`}
        </Text>
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[12px] leading-[20px] font-medium text-[#777E91]"
        >
          Remaining
        </Text>
      </View>

      <View className="flex flex-row items-center justify-between mt-1">
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[12px] leading-[20px] font-normal text-[#353945]"
        >
          0.5$ per Item
        </Text>
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[12px] leading-[20px] font-normal text-[#353945]"
        >
          {days > 0 ? `${days}d` : "353d"} : {hours > 0 ? `${hours}h` : "20h"}{" : "}
          {minutes > 0 ? `${minutes}m` : "35m"}
        </Text>
      </View>

      <View className="bg-[#EEFBF8] p-2 rounded-[9px] mt-1">
        <View className="w-full flex flex-row items-center my-2 rounded-[12px]">
          <View
            className="h-[5px] bg-[#00B0AD] rounded-l-[15px]"
            style={{
              width: `${stored === 0 ? stored : stored + 1}%`,
              borderTopRightRadius: stored === 100 ? 15 : 0,
              borderBottomRightRadius: stored === 100 ? 15 : 0,
            }}
          />
          <View
            className="h-[5px] bg-[#FFFFFF] rounded-r-[15px]"
            style={{
              width: `${100 - stored}%`,
              borderTopLeftRadius: stored === 0 ? 15 : 0,
              borderBottomLeftRadius: stored === 0 ? 15 : 0,
            }}
          />
        </View>
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[16px] leading-[20px] font-normal text-[#353945] text-center"
        >
          {stored} Stored
        </Text>
      </View>

      <View className="bg-[#EEFBF8] p-2 rounded-[9px] mt-2">
        <View className="w-full flex flex-row items-center my-2 rounded-[12px]">
          <View
            className="h-[5px] bg-[#00B0AD] rounded-l-[15px]"
            style={{
              width: `${returns === 0 ? returns : returns + 1}%`,
              borderTopRightRadius: returns === 100 ? 15 : 0,
              borderBottomRightRadius: returns === 100 ? 15 : 0,
            }}
          />
          <View
            className="h-[5px] bg-[#FFFFFF] rounded-r-[15px]"
            style={{
              width: `${100 - returns}%`,
              borderTopLeftRadius: returns === 0 ? 15 : 0,
              borderBottomLeftRadius: returns === 0 ? 15 : 0,
            }}
          />
        </View>
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[16px] leading-[20px] font-normal text-[#353945] text-center"
        >
          {totalReturns} Returns
        </Text>
      </View>
    </View>
  );
};

export default memo(StorerBountyDetailsCard);
