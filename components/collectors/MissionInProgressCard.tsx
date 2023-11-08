import { View, Text, Image } from "react-native";
import { FC, memo } from "react";
import moment from "moment";
import { MissionDoc } from "redux/missions/mission.types";
import { additionalUri } from "services/axios";

type Props = {
  mission: MissionDoc;
  itemWidth: number;
  linkedImage: string;
};

const MissionInProgressCard: FC<Props> = ({
  mission,
  itemWidth,
  linkedImage,
}) => {
  return (
    <View className="p-4 rounded-[12px]" style={{ width: itemWidth }}>
      {linkedImage === "" ? (
        <View className="overflow-hidden rounded-t-xl h-[90px]">
          <Image
            // eslint-disable-next-line global-require
            source={require("../../assets/images/Image.png")}
          />
        </View>
      ) : null}

      {linkedImage ? (
        <View className="overflow-hidden rounded-t-xl h-[90px]">
          <Image
            // eslint-disable-next-line global-require
            source={{ uri: `${additionalUri}/api/v1/${linkedImage}` }}
            className="w-full h-[140px]"
          />
        </View>
      ) : null}

      <View className="w-[100%] rounded-b-xl bg-white">
        <View className="px-4 pt-4 flex flex-row items-center justify-between">
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[14px] leading-[20px] font-normal text-[#23262F]"
          >
            {mission?.bounty_name.length > 20
              ? `${mission?.bounty_name.substring(0, 20)}...`
              : mission?.bounty_name}
          </Text>
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[14px] leading-[20px] font-medium text-[#23262F]"
          >
            Worldwide
          </Text>
        </View>
        <View className="px-4 pt-2 flex flex-row items-center justify-between">
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[12px] leading-[20px] font-medium text-[#777E91]"
          >
            {mission?.bounty_description?.length > 30
              ? `${mission?.bounty_description.substring(0, 30)}...`
              : mission?.bounty_description}
          </Text>

          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[12px] leading-[20px] font-medium text-[#777E91]"
          >
            Until
          </Text>
        </View>

        <View className="py-2 px-4 flex flex-row items-center justify-between">
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

export default memo(MissionInProgressCard);
