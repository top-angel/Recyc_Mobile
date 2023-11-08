import { View, Text, TouchableOpacity } from "react-native";
import { FC, memo } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppSelector } from "redux/hooks";
import { RootStackParamList, ROUTES } from "navigation/NavigationTypes";
import TruckIcon from "../icons/TruckIcon";
import BottleIcon from "../icons/BottleIcon";
import DollarSignIcon from "../icons/DollarSignIcon";
import GroupListTraceIcon from "../icons/GroupListTraceIcon";
import TraceMissionCard from "./TraceMissionCard";
import TraceRewardCard from "./TraceRewardCard";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  ROUTES.COLLECT_TRACE_MISSION
>;

type Props = {
  missionId: string;
};

const TraceMissionContent: FC<Props> = ({ missionId }) => {
  const navigate = useNavigation<NavigationProp>();

  const { total } = useAppSelector((state) => state.bountyClaimedByWallet);

  return (
    <View className="flex-1 bg-02-purple-mission rounded-t-[20px] z-20 p-4 -mt-7">
      <View className="flex flex-row items-center justify-between mt-2">
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[22px] leading-[36px] font-bold text-[#FFFFFF]"
        >
          Trace & Collect Rewards
        </Text>
        <TruckIcon style={{ width: 25, height: 24, color: "#FFFFFF" }} />
      </View>

      <View className="flex flex-row items-center justify-between mt-8">
        <TouchableOpacity
          onPress={() =>
            navigate.navigate(ROUTES.COLLECT_ITEMS_COLLECTED, { missionId })
          }
          className="flex flex-row items-center justify-center bg-[#E3EAEF] rounded-[6px] p-2 w-[48%]"
        >
          <BottleIcon style={{ width: 9, height: 24, color: "#1C3C59" }} />
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[14px] leading-[20px] font-bold text-[#1C3C59] ml-2"
          >
            {total} Items
          </Text>
        </TouchableOpacity>

        <View className="flex flex-row items-center justify-center bg-[#E3EAEF] rounded-[6px] p-2 w-[48%]">
          <DollarSignIcon style={{ width: 24, height: 24, color: "#1C3C59" }} />
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[14px] leading-[20px] font-bold text-[#1C3C59] ml-2"
          >
            $0.6 per items
          </Text>
        </View>
      </View>

      <View className="mt-6 flex flex-row">
        <GroupListTraceIcon />

        <View className="ml-4 flex-1">
          <TraceMissionCard
            header="Storer"
            icon={
              <BottleIcon style={{ width: 10, height: 24, color: "#1C3C59" }} />
            }
            footerLeft="Row Lawson"
            footerRight="Mission St. 123 432A - New York"
          />

          <View className="h-[45px]" />

          <TraceMissionCard
            header="Producer"
            icon={
              <BottleIcon style={{ width: 10, height: 24, color: "#1C3C59" }} />
            }
            footerLeft="Coca Cola"
            footerRight="Mission St. 123 432A - Amsterdam"
          />

          <View className="h-[40px]" />

          <TraceRewardCard />
        </View>
      </View>
    </View>
  );
};

export default memo(TraceMissionContent);
