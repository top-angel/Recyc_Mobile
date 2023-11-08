import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Text,
} from "react-native";
import { FC, memo, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useShowNavigationHeader } from "../hooks/useShowNavigationHeader";
import { RootStackParamList, ROUTES } from "../navigation/NavigationTypes";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Title from "../components/global/Title";
import SingleCreatedMission from "../components/createdMissions/SingleCreatedMission";
import { getMissionById } from "../redux/missions/missionGetById/missionGetById.actions";
import { useGetTokens } from "../hooks/creators/useGetTokens";
import { refreshAccessToken } from "../redux/auth/authRefreshToken/authRefreshToken.actions";
import { wait } from "../lib/waitTimeout";
import { useOnSuccessRefreshToken } from "../hooks/creators/useOnSuccessRefreshToken";
import { ColorSchema } from "../enums/colorSchema";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  ROUTES.VERIFY_AND_STORAGE
>;

const CreatorCreatedScreen: FC = () => {
  const navigate = useNavigation<NavigationProp>();

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string>("");
  const [refreshToken, setRefreshToken] = useState<string>("");

  const { missions, success } = useAppSelector(
    (state) => state.missionsGetByUser,
  );
  const dispatch = useAppDispatch();

  /* Show navigation header */
  useShowNavigationHeader({
    headerColor: ColorSchema.CREATOR_COLOR,
    isBackVisible: true,
    isTitleVisible: true,
    navigateToHome: ROUTES.HOME,
  });

  /** GET TOKENS FROM SECURE STORE */
  useGetTokens({ setAccessToken, setRefreshToken });

  /** UPDATE ACCESS TOKEN ON REFRESH TOKEN */
  useOnSuccessRefreshToken({ setAccessToken });

  const handleRedirect = (missionId: string) => {
    navigate.navigate(ROUTES.CREATE_MISSION_SINGLE);
    dispatch(getMissionById({ accessToken, id: missionId }));
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
      <View className="flex-1 bg-01-blue-mission">
        <ScrollView
          className="flex-1 p-0"
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#FFFFFF"
              progressBackgroundColor="#FFFFFF"
            />
          }
        >
          <View className="mt-2 mb-6 p-4">
            <Title title="Created Missions" textColor="#FFFFFF" />
          </View>

          <View>
            {missions.map((mission) => (
              <TouchableOpacity
                key={mission.id}
                onPress={() => handleRedirect(mission.id)}
              >
                <SingleCreatedMission mission={mission} />
              </TouchableOpacity>
            ))}
          </View>

          {success && missions.length === 0 ? (
            <View className="p-4">
              <Text
                style={{ fontFamily: "Nunito" }}
                className="text-[16px] leading-[20px] font-semibold text-[#FFFFFF]"
              >
                You do not have created missions yet.
              </Text>
            </View>
          ) : null}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default memo(CreatorCreatedScreen);
