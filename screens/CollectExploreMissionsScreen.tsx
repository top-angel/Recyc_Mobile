import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { memo, FC, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useShowNavigationHeader } from "../hooks/useShowNavigationHeader";
import { ColorSchema } from "../enums/colorSchema";
import { RootStackParamList, ROUTES } from "../navigation/NavigationTypes";
import SearchIcon from "../components/icons/SearchIcon";
import ExploreMissionCard from "../components/collectors/ExploreMissionCard";
import { queryMissionForPublic } from "../redux/missions/missionQueryPublic/missionQueryPublic.actions";
import { useGetTokens } from "../hooks/creators/useGetTokens";
import { refreshAccessToken } from "../redux/auth/authRefreshToken/authRefreshToken.actions";
import { wait } from "../lib/waitTimeout";
import Spinner from "../components/global/Spinner";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  ROUTES.COLLECT_MISSIONS
>;

const CollectExploreMissionsScreen: FC = () => {
  const navigate = useNavigation<NavigationProp>();

  const [accessToken, setAccessToken] = useState<string>("");
  const [refreshToken, setRefreshToken] = useState<string>("");
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const { missions, loading, success } = useAppSelector(
    (state) => state.missionsGetInProgress,
  );
  const dispatch = useAppDispatch();

  /* Show navigation header */
  useShowNavigationHeader({
    headerColor: ColorSchema.COLLECTOR_COLOR,
    isBackVisible: true,
    isTitleVisible: true,
    navigateToHome: ROUTES.HOME,
  });

  /** GET TOKENS FROM SECURE STORE */
  useGetTokens({ setAccessToken, setRefreshToken });

  const handleRedirect = (bountyId: string, missionId: string) => {
    dispatch(queryMissionForPublic({ accessToken, id: bountyId }));
    navigate.navigate(ROUTES.COLLECT_MISSION_SINGLE, { missionId });
  };

  /** ON REFRESH LOAD DATA */
  const onRefresh = () => {
    setRefreshing(true);
    if (refreshToken) {
      dispatch(refreshAccessToken({ refresh_token: refreshToken }));
    }
    wait(300).then(() => setRefreshing(false));
  };

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      {loading ? <Spinner /> : null}
      <ScrollView
        className="flex-1 bg-02-purple-mission"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#FFFFFF"
            progressBackgroundColor="#FFFFFF"
          />
        }
      >
        <View className="flex flex-row items-center justify-between p-4 mt-2">
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[22px] leading-[36px] font-bold text-[#FFFFFF]"
          >
            Explore Missions
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

        {missions.length > 0 && success ? (
          <View className="p-4">
            {missions.map((mission) => (
              <TouchableOpacity
                key={mission.id}
                onPress={() => handleRedirect(mission.bounty_id, mission.id)}
              >
                <ExploreMissionCard mission={mission} />
              </TouchableOpacity>
            ))}
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default memo(CollectExploreMissionsScreen);
