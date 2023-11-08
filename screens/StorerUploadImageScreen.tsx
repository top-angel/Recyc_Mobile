import {
  View,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { memo, FC, useState } from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useGetLocation } from "../hooks/creators/useGetLocation";
import { useGetAccessToken } from "../hooks/storer/useGetAccessToken";
import BackButton from "../components/header/BackButton";
import HeaderTitle from "../components/header/HeaderTitle";
import { ROUTES } from "../navigation/NavigationTypes";
import { useGetBountyDescriptionForUpload } from "../hooks/storer/useGetBountyDescriptionForUpload";
import StorerBeforeUploadCard from "../components/verify-storage/StorerBeforeUploadCard";
import StorerAfterUploadCard from "../components/verify-storage/StorerAfterUploadCard";
import Spinner from "../components/global/Spinner";

const StorerUploadImageScreen: FC = () => {
  const route = useRoute<RouteProp<{ params: { data: StorerUploadFile } }>>();
  const { data } = route.params;

  const [isStored, setIsStored] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { height: screenHeight } = Dimensions.get("screen");

  /** SET GEOLOCATION */
  useGetLocation();

  /** GET ACCESS_TOKEN */
  const { accessToken } = useGetAccessToken();

  /** GET BOUNTY DESCRIPTION */
  useGetBountyDescriptionForUpload({ accessToken });

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      {loading ? <Spinner /> : null}
      <ScrollView className="flex-1 bg-03-green-mission">
        <View className="flex-1 relative">
          {data?.fileData?.uri ? (
            <Image
              source={{ uri: data?.fileData?.uri }}
              style={{ height: screenHeight / 2 }}
              className="object-cover"
            />
          ) : null}

          <View className="flex flex-row items-center absolute z-10 top-10">
            <BackButton />
            <View className="flex-1 justify-center items-center">
              <HeaderTitle navigateToHome={ROUTES.HOME} />
            </View>
          </View>

          <View className="flex-1 bg-03-green-mission rounded-t-[20px] z-20 p-4 -mt-7">
            {!isStored ? (
              <StorerBeforeUploadCard
                totalReturns={data?.totalItems}
                fileData={data?.fileData}
                setLoading={setLoading}
                accessToken={accessToken}
                setIsStored={setIsStored}
                missionId={data?.missionId}
              />
            ) : null}

            {isStored ? (
              <StorerAfterUploadCard
                totalReturns={data?.totalItems}
                setIsStored={setIsStored}
              />
            ) : null}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default memo(StorerUploadImageScreen);
