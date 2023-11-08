import { View, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { memo, FC, useState } from "react";
import SingleMissionImageHeader from "../components/createdMissions/SingleMissionImageHeader";
import WorldMapIcon from "../components/icons/WorldMapIcon";
import { collectors } from "../lib/dataForMission";
import SingleStorer from "../components/missions/SingleStorer";
import MissionItemTitle from "../components/missions/MissionItemTitle";
import MissionItemSort from "../components/missions/MissionItemSort";
import ItemFakeMarker from "../components/missions/ItemFakeMarker";

const CreatorItemStatusStorersScreen: FC = () => {
  const [collectorId, setCollectorId] = useState<string>("");

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <SingleMissionImageHeader />
      <View className="flex-1 bg-white rounded-t-[20px] z-20 p-4 -mt-7">
        <MissionItemTitle
          textLeft="Storers"
          textRight="24 Locations"
          textColor="#1E5455"
        />

        <View className="relative">
          <WorldMapIcon />

          {collectorId === "1" ? (
            <ItemFakeMarker positionX={100} positionY={40} />
          ) : null}

          {collectorId === "2" ? (
            <ItemFakeMarker positionX={50} positionY={100} />
          ) : null}

          {collectorId === "3" ? (
            <ItemFakeMarker positionX={70} positionY={100} />
          ) : null}

          {collectorId === "4" ? (
            <ItemFakeMarker positionX={80} positionY={20} />
          ) : null}
        </View>
        <ScrollView className="flex-1 p-0 bg-white -mt-48 pt-6">
          <MissionItemSort backgroundRight="#55c0c33b" textColor="#1E5455" />

          <View className="mt-4">
            {collectors.map((collector) => (
              <SingleStorer
                key={collector.id}
                item={collector}
                itemId={collectorId}
                setItemId={setCollectorId}
              />
            ))}
          </View>

          <View className="h-[30px]" />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default memo(CreatorItemStatusStorersScreen);
