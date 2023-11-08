import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import { memo, FC, useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { useGetTokens } from "../hooks/creators/useGetTokens";
import { useOnSuccessRefreshToken } from "../hooks/creators/useOnSuccessRefreshToken";
import { refreshAccessToken } from "../redux/auth/authRefreshToken/authRefreshToken.actions";
import { wait } from "../lib/waitTimeout";
import Spinner from "../components/global/Spinner";
import { useFetchPublicMissionImage } from "../hooks/collectors/useFetchPublicMissionImage";
import { useUpdatePublicMissionWithImage } from "../hooks/collectors/useUpdatePublicMissionWithImage";
import SinglePublicMissionImageHeader from "../components/collectors/SinglePublicMissionImageHeader";
import SinglePublicMissionView from "../components/collectors/SinglePublicMissionView";
import { useGetLocation } from "../hooks/creators/useGetLocation";
import { useGetCollectorPublicAddress } from "../hooks/aggregates/useGetCollectorPublicAddress";
import { useCountTotalReturnedItems } from "../hooks/collectors/useCountTotalReturnedItems";
import { useFetchAllStorersByGeolocation } from "../hooks/storer/useFetchAllStorersByGeolocation";

const CollectorSingleMissionScreen: FC = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string>("");
  const [refreshToken, setRefreshToken] = useState<string>("");

  const dispatch = useAppDispatch();

  /** TAKE USER LOCATION */
  useGetLocation();

  /** GET TOKENS FROM SECURE STORE */
  useGetTokens({ setAccessToken, setRefreshToken });

  /** UPDATE ACCESS TOKEN ON REFRESH TOKEN */
  useOnSuccessRefreshToken({ setAccessToken });

  /** FETCH MISSION IMAGE BY BOUNTY ENTITY LIST */
  const { loading } = useFetchPublicMissionImage({ accessToken });

  /** UPDATE SINGLE MISSION WITH IMAGE */
  useUpdatePublicMissionWithImage();

  /** GET CREATOR WALLET ADDRESS */
  const { publicAddress } = useGetCollectorPublicAddress();

  /** FETCH TOTAL COLLECTED AND STORED ITEMS */
  useCountTotalReturnedItems({ publicAddress });

  /** FETCH ALL STORERS BY GEOLOCATION */
  useFetchAllStorersByGeolocation();

  /** ON REFRESH LOAD DATA */
  const onRefresh = () => {
    setRefreshing(true);
    if (refreshToken) {
      dispatch(refreshAccessToken({ refresh_token: refreshToken }));
    }
    wait(300).then(() => setRefreshing(false));
  };

  return (
    <SafeAreaView
      style={StyleSheet.absoluteFillObject}
      className="bg-02-purple-mission"
    >
      {loading ? <Spinner /> : null}
      <ScrollView
        className="flex-1 p-0 bg-white rounded-t-[20px]"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#FFFFFF"
            progressBackgroundColor="#FFFFFF"
          />
        }
      >
        <SinglePublicMissionImageHeader />

        <SinglePublicMissionView />
      </ScrollView>
    </SafeAreaView>
  );
};

export default memo(CollectorSingleMissionScreen);
