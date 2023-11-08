import { View, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { memo, FC, useState } from "react";
import SingleMissionImageHeader from "../components/createdMissions/SingleMissionImageHeader";
import WorldMapIcon from "../components/icons/WorldMapIcon";
import { collectors } from "../lib/dataForMission";
import SingleCollector from "../components/missions/SingleCollector";
import MissionItemTitle from "../components/missions/MissionItemTitle";
import MissionItemSort from "../components/missions/MissionItemSort";
import ItemFakeMarker from "../components/missions/ItemFakeMarker";
import { ColorSchema } from "../enums/colorSchema";
import { useGetAccessToken } from "../hooks/collectors/useGetAccessToken";

const CreatorItemStatusCollectorsScreen: FC = () => {
  const [collectorId, setCollectorId] = useState<string>("");

  /** GET ACCESS TOKEN */
  const { accessToken } = useGetAccessToken();

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <SingleMissionImageHeader />
      <View className="flex-1 bg-white rounded-t-[20px] z-20 p-4 -mt-7">
        <MissionItemTitle
          textLeft="Collectors"
          textRight="3242 Locations"
          textColor={ColorSchema.CREATOR_COLOR_ICON}
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
          <MissionItemSort backgroundRight="#D3ECED" textColor="#394E50" />

          <View className="mt-4">
            {collectors.map((collector) => (
              <SingleCollector
                key={collector.id}
                item={collector}
                itemId={collectorId}
                setItemId={setCollectorId}
                accessToken={accessToken}
              />
            ))}
          </View>

          <View className="h-[30px]" />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default memo(CreatorItemStatusCollectorsScreen);
