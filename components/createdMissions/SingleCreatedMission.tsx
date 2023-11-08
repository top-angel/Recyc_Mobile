import { View, Text, Image } from "react-native";
import { memo, FC } from "react";
import numeral from "numeral";
import moment from "moment";
import { MissionDoc } from "redux/missions/mission.types";

type Props = {
  mission: MissionDoc;
};

const SingleCreatedMission: FC<Props> = ({ mission }) => {
  // Calculate total difference between end and start date in seconds
  let diffInSeconds = moment(mission.end_date).diff(
    moment(mission.start_date),
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

  return (
    <View className="p-4 rounded-[12px]">
      <View className="overflow-hidden rounded-t-[12px]">
        <Image
          // eslint-disable-next-line global-require
          source={require("../../assets/images/Image.png")}
          className="w-full h-[120px]"
        />
      </View>
      <View className="rounded-b-[12px]">
        <View className="bg-white px-4 pt-4 flex flex-row items-center justify-between">
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[14px] leading-[20px] font-medium text-[#23262F]"
          >
            {mission?.bounty_description?.length > 30
              ? `${mission?.bounty_description.substring(0, 30)}...`
              : mission?.bounty_description}
          </Text>
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[14px] leading-[20px] font-medium text-[#23262F]"
          >
            Worldwide
          </Text>
        </View>
        <View className="bg-white px-4 pt-4 flex flex-row items-center justify-between">
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[14px] leading-[20px] font-normal text-[#777E91]"
          >
            {mission?.company_name}
          </Text>
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[14px] leading-[20px] font-normal text-[#777E91]"
          >
            Remaining
          </Text>
        </View>

        <View className="bg-white p-4 rounded-b-[12px] flex flex-row items-center justify-between">
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[14px] leading-[20px] font-normal text-[#777E91]"
          >
            {numeral(mission?.accepted_entity_count).format("0,0")}/
            {numeral(mission?.image_count).format("0,0")}
          </Text>
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[14px] leading-[20px] font-normal text-[#777E91]"
          >
            {days > 0 ? `${days}d` : ""} {hours > 0 ? `${hours}h` : ""}{" "}
            {minutes > 0 ? `${minutes}m` : ""}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default memo(SingleCreatedMission);
