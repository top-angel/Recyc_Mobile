import { View, Text, Image } from "react-native";
import { memo, FC } from "react";
import moment from "moment";
import { MissionPartialDoc } from "redux/missions/mission.types";

type Props = {
  mission: MissionPartialDoc;
};

const ExploreMissionCard: FC<Props> = ({ mission }) => {
  return (
    <View className="p-4 rounded-[12px]">
      <View className="overflow-hidden rounded-t-[12px] h-[100px]">
        <Image
          // eslint-disable-next-line global-require
          source={require("../../assets/images/Image.png")}
          className="w-full h-[120px]"
        />
      </View>
      <View className="rounded-b-[12px] w-[100%]">
        <View className="bg-white px-4 pt-4 flex flex-row items-center justify-between">
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[14px] leading-[20px] font-normal text-[#23262F]"
          >
            {mission?.title.length > 20
              ? `${mission?.title.substring(0, 20)}...`
              : mission?.title}
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
            className="text-[12px] leading-[20px] font-medium text-[#777E91]"
          >
            {mission?.description?.length > 30
              ? `${mission?.description.substring(0, 30)}...`
              : mission?.description}
          </Text>

          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[12px] leading-[20px] font-medium text-[#777E91]"
          >
            Until
          </Text>
        </View>

        <View className="bg-[#FFFFFF] py-2 px-4 flex flex-row items-center justify-between">
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[12px] leading-[20px] font-medium text-[#353945]"
          >
            Total Reward: 87,000$
          </Text>

          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[12px] leading-[20px] font-medium text-[#353945]"
          >
            {moment(mission?.end_date).format("DD.MM.YYYY HH:mm")}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default memo(ExploreMissionCard);
