import { View, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { memo, FC } from "react";
import SingleMissionImageHeader from "../components/createdMissions/SingleMissionImageHeader";
import MissionItemTitle from "../components/missions/MissionItemTitle";
import MissionItemSort from "../components/missions/MissionItemSort";
import ItemLogCard from "../components/missions/ItemLogCard";
import { ColorSchema } from "../enums/colorSchema";

const CreatorItemLogScreen: FC = () => {
  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <ScrollView className="flex-1 p-0 bg-[#FFFFFF]">
        <SingleMissionImageHeader />
        <View className="flex-1 bg-white rounded-t-[20px] z-20 p-4 -mt-7">
          <MissionItemTitle
            textLeft="Item Log"
            textRight="26489 Locations"
            textColor={ColorSchema.CREATOR_COLOR_ICON}
          />

          <View className="mt-6">
            <MissionItemSort backgroundRight="#D3ECED" textColor="#394E50" />

            <ItemLogCard />
            <ItemLogCard />

            <View className="h-[20px]" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default memo(CreatorItemLogScreen);
