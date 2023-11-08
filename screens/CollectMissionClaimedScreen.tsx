import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { memo, FC } from "react";
import { useShowNavigationHeader } from "../hooks/useShowNavigationHeader";
import { ColorSchema } from "../enums/colorSchema";
import { ROUTES } from "../navigation/NavigationTypes";
import { useAppSelector } from "../redux/hooks";
import SearchIcon from "../components/icons/SearchIcon";
import SlidersIcon from "../components/icons/SlidersIcon";
import MissionClaimedCard from "../components/collectors/MissionClaimedCard";

const CollectMissionClaimedScreen: FC = () => {
  const { missions } = useAppSelector((state) => state.missionClaim);

  /* Show navigation header */
  useShowNavigationHeader({
    headerColor: ColorSchema.COLLECTOR_COLOR,
    isBackVisible: true,
    isTitleVisible: true,
    navigateToHome: ROUTES.HOME,
  });

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <ScrollView className="flex-1 bg-02-purple-mission">
        <View className="flex flex-row items-center justify-between p-4 mt-2">
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[22px] leading-[36px] font-bold text-[#FFFFFF]"
          >
            Claimed Missions
          </Text>
          <View className="flex flex-row items-center">
            <Text
              style={{ fontFamily: "Nunito" }}
              className="text-[22px] leading-[36px] font-light text-[#FFFFFF] mr-2"
            >
              Search
            </Text>
            <SearchIcon style={{ width: 24, height: 24, color: "#FFF" }} />
          </View>
        </View>

        <View className="flex flex-row items-center p-4">
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[16px] leading-[36px] font-light text-[#FFFFFF] mr-2"
          >
            Filter
          </Text>
          <SlidersIcon
            style={{
              width: 24,
              height: 25,
              color: "#FFFFFF",
            }}
          />
        </View>

        <View className="p-4">
          {missions.map((mission) => (
            <MissionClaimedCard mission={mission} key={mission.missionId} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default memo(CollectMissionClaimedScreen);
