import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { memo, FC, useState } from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import MissionUploadCard from "../components/collectors/MissionUploadCard";
import { useGetLocation } from "../hooks/creators/useGetLocation";
import { useGetAccessToken } from "../hooks/collectors/useGetAccessToken";
import Spinner from "../components/global/Spinner";
import BackButton from "../components/header/BackButton";
import HeaderTitle from "../components/header/HeaderTitle";
import { ROUTES } from "../navigation/NavigationTypes";

const CollectUploadFileScreen: FC = () => {
  const route =
    useRoute<RouteProp<{ params: { data: CollectorUploadFile } }>>();
  const { data } = route.params;

  const { height: screenHeight } = Dimensions.get("screen");

  const [loading, setLoading] = useState(false);

  /** SET GEOLOCATION */
  useGetLocation();

  /** GET ACCESS_TOKEN */
  const { accessToken } = useGetAccessToken();

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      {loading ? <Spinner /> : null}
      <ScrollView className="flex-1 bg-02-purple-mission">
        <View className="flex-1 relative">
          {data?.fileData?.uri ? (
            <Image
              source={{ uri: data?.fileData?.uri }}
              style={{ height: (screenHeight * 2) / 5 }}
              className="object-cover"
            />
          ) : null}

          <View className="flex flex-row items-center absolute z-10 top-10">
            <BackButton />
            <View className="flex-1 justify-center items-center">
              <HeaderTitle navigateToHome={ROUTES.HOME} />
            </View>
          </View>
        </View>

        <View className="flex-1 bg-02-purple-mission rounded-t-[20px] z-20 p-4 -mt-7">
          <View className="h-[20px]" />
          <MissionUploadCard
            mission={data?.mission}
            fileData={data?.fileData}
            accessToken={accessToken}
            setLoading={setLoading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default memo(CollectUploadFileScreen);
