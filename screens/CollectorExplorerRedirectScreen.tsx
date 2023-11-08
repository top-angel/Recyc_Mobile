import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { memo, FC, useEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useShowNavigationHeader } from "../hooks/useShowNavigationHeader";
import { ColorSchema } from "../enums/colorSchema";
import { ROUTES, RootStackParamList } from "../navigation/NavigationTypes";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useGetTokens } from "../hooks/creators/useGetTokens";
import { queryMissionForPublic } from "../redux/missions/missionQueryPublic/missionQueryPublic.actions";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  ROUTES.COLLECT_EXPLORE_REDIRECTION
>;

const CollectorExplorerRedirectScreen: FC = () => {
  const navigate = useNavigation<NavigationProp>();

  const [accessToken, setAccessToken] = useState<string>("");
  const [, setRefreshToken] = useState<string>("");

  const { missions, success } = useAppSelector(
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

  useEffect(() => {
    if (missions.length > 0 && accessToken) {
      dispatch(
        queryMissionForPublic({ accessToken, id: missions[0].bounty_id }),
      );
      navigate.navigate(ROUTES.COLLECT_MISSION_SINGLE, {
        missionId: missions[0].id,
      });
    }
  }, [accessToken, dispatch, missions, navigate]);

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <View className="flex items-center flex-1 justify-center bg-02-purple-mission">
        {success && missions.length > 0 ? (
          <View className="-mt-24">
            <Text
              style={{ fontFamily: "Nunito" }}
              className="text-[16px] leading-[20px] font-normal text-[#FFFFFF]"
            >
              Redirect to mission..
            </Text>
          </View>
        ) : null}

        {success && missions.length === 0 ? (
          <View className="-mt-24 flex flex-col items-center justify-center">
            <Text
              style={{ fontFamily: "Nunito" }}
              className="text-[16px] leading-[20px] font-bold text-[#FFFFFF] text-center"
            >
              No availabe missions for this bounty. Go back to choose another
              bounty.
            </Text>

            <TouchableOpacity onPress={() => navigate.goBack()}>
              <View className="mt-6 bg-[#FFFFFF] rounded-[10px] py-2 px-5">
                <Text
                  style={{ fontFamily: "Nunito" }}
                  className="text-[16px] leading-[20px] font-normal text-02-purple-mission"
                >
                  Back
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default memo(CollectorExplorerRedirectScreen);
