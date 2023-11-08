import { View, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { FC, memo } from "react";
import SingleMissionImageHeader from "../components/createdMissions/SingleMissionImageHeader";
import Title from "../components/global/Title";
import GroupListIcon from "../components/icons/GroupListIcon";
import ItemStatusBannerSmall from "../components/missions/ItemStatusBannerSmall";
import ItemStatusBannerBig from "../components/missions/ItemStatusBannerBig";
import { ROUTES } from "../navigation/NavigationTypes";

const CreatorItemStatusScreen: FC = () => {
  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <ScrollView className="flex-1 p-0 bg-white">
        <SingleMissionImageHeader />
        <View className="flex-1 bg-white rounded-t-[20px] z-20 p-4 -mt-7">
          <Title title="Item Status" textColor="#454545" />

          <View className="mt-4 flex flex-row">
            <GroupListIcon />

            <View className="flex-1 ml-4">
              <ItemStatusBannerSmall
                headerTitle="Collectors"
                iconTitle="7500 Items"
                footerTitle="4632 Active Collectors"
                route={ROUTES.CREATE_MISSION_ITEM_STATUS_COLLECTORS}
              />

              <View className="h-[45px]" />

              <ItemStatusBannerSmall
                headerTitle="Storers"
                iconTitle="10000 Items"
                footerTitle="32 Active Storers"
                route={ROUTES.CREATE_MISSION_ITEM_STATUS_STORERS}
              />

              <View className="h-[45px]" />

              <ItemStatusBannerBig />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default memo(CreatorItemStatusScreen);
