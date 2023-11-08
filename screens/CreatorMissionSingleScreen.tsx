import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { memo, FC, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useGetTokens } from "../hooks/creators/useGetTokens";
import { useFetchMissionImage } from "../hooks/missions/useFetchMissionImage";
import SingleMissionImageHeader from "../components/createdMissions/SingleMissionImageHeader";
import Spinner from "../components/global/Spinner";
import { useUpdateMissionWithImage } from "../hooks/missions/useUpdateMissionWithImage";
import { useAppDispatch } from "../redux/hooks";
import { refreshAccessToken } from "../redux/auth/authRefreshToken/authRefreshToken.actions";
import { wait } from "../lib/waitTimeout";
import SingleMissionView from "../components/createdMissions/SingleMissionView";
import { useOnSuccessRefreshToken } from "../hooks/creators/useOnSuccessRefreshToken";
import SingleMissionCard from "../components/createdMissions/SingleMissionCard";
import BottleIcon from "../components/icons/BottleIcon";
import ArrowRightIcon from "../components/icons/ArrowRightIcon";
import MessageCircleIcon from "../components/icons/MessageCircleIcon";
import ListIcon from "../components/icons/ListIcon";
import SlidersIcon from "../components/icons/SlidersIcon";
import FileTextIcon from "../components/icons/FileTextIcon";
import { RootStackParamList, ROUTES } from "../navigation/NavigationTypes";
import { ColorSchema } from "../enums/colorSchema";
import TruckIcon from "../components/icons/TruckIcon";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  ROUTES.CREATE_MISSION_SINGLE
>;

const CreatorMissionSingleScreen: FC = () => {
  const navigate = useNavigation<NavigationProp>();

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string>("");
  const [refreshToken, setRefreshToken] = useState<string>("");

  const dispatch = useAppDispatch();

  /** GET TOKENS FROM SECURE STORE */
  useGetTokens({ setAccessToken, setRefreshToken });

  /** UPDATE ACCESS TOKEN ON REFRESH TOKEN */
  useOnSuccessRefreshToken({ setAccessToken });

  /** FETCH MISSION IMAGE BY BOUNTY ENTITY LIST */
  const { loading } = useFetchMissionImage({ accessToken });

  /** UPDATE SINGLE MISSION WITH IMAGE */
  useUpdateMissionWithImage();

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
      className="bg-01-blue-mission"
    >
      {loading ? <Spinner /> : null}
      <View className="flex-1 bg-01-blue-mission">
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
          <SingleMissionImageHeader />
          <SingleMissionView />

          <TouchableOpacity
            className="my-2 px-4"
            onPress={() => navigate.navigate(ROUTES.CREATE_MISSION_ITEM_STATUS)}
          >
            <SingleMissionCard
              iconLeft={
                <BottleIcon
                  style={{
                    width: 24,
                    height: 24,
                    color: ColorSchema.CREATOR_COLOR_ICON,
                  }}
                />
              }
              iconRight={
                <ArrowRightIcon
                  style={{
                    width: 20,
                    height: 20,
                    color: "#BBBBBB",
                  }}
                />
              }
              title="Items Status"
              subtitle="Track & Trace your items"
              titleColor={ColorSchema.CREATOR_COLOR_ICON}
              subtitleColor="rgba(66, 93, 126, 0.62)"
            />
          </TouchableOpacity>

          <TouchableOpacity
            className="my-2 px-4"
            onPress={() => navigate.navigate(ROUTES.CREATE_MISSION_ITEM_LOG)}
          >
            <SingleMissionCard
              iconLeft={
                <ListIcon
                  style={{
                    width: 24,
                    height: 25,
                    color: ColorSchema.CREATOR_COLOR_ICON,
                  }}
                />
              }
              iconRight={
                <ArrowRightIcon
                  style={{
                    width: 20,
                    height: 20,
                    color: "#BBBBBB",
                  }}
                />
              }
              title="Item Log"
              subtitle="Log of all Transactions"
              titleColor={ColorSchema.CREATOR_COLOR_ICON}
              subtitleColor="rgba(66, 93, 126, 0.62)"
            />
          </TouchableOpacity>

          <TouchableOpacity
            className="my-2 px-4"
            onPress={() => navigate.navigate(ROUTES.CREATE_MISSION_DETAILS)}
          >
            <SingleMissionCard
              iconLeft={
                <SlidersIcon
                  style={{
                    width: 24,
                    height: 25,
                    color: ColorSchema.CREATOR_COLOR_ICON,
                  }}
                />
              }
              iconRight={
                <ArrowRightIcon
                  style={{
                    width: 20,
                    height: 20,
                    color: "#BBBBBB",
                  }}
                />
              }
              title="Mission Details"
              subtitle="Display & Edit Mission Details"
              titleColor={ColorSchema.CREATOR_COLOR_ICON}
              subtitleColor="rgba(66, 93, 126, 0.62)"
            />
          </TouchableOpacity>

          <TouchableOpacity
            className="my-2 px-4"
            onPress={() =>
              navigate.navigate(ROUTES.CREATE_MISSION_CHAT, {
                data: { isWithImage: true },
              })
            }
          >
            <SingleMissionCard
              iconLeft={
                <MessageCircleIcon
                  style={{
                    width: 24,
                    height: 24,
                    color: ColorSchema.CREATOR_COLOR_ICON,
                  }}
                />
              }
              iconRight={
                <ArrowRightIcon
                  style={{
                    width: 20,
                    height: 20,
                    color: "#BBBBBB",
                  }}
                />
              }
              title="Chat"
              subtitle="2 Unread Messages"
              titleColor={ColorSchema.CREATOR_COLOR_ICON}
              subtitleColor="rgba(66, 93, 126, 0.62)"
            />
          </TouchableOpacity>

          <TouchableOpacity className="my-2 px-4">
            <SingleMissionCard
              iconLeft={
                <FileTextIcon
                  style={{
                    width: 24,
                    height: 25,
                    color: ColorSchema.CREATOR_COLOR_ICON,
                  }}
                />
              }
              iconRight={
                <ArrowRightIcon
                  style={{
                    width: 20,
                    height: 20,
                    color: "#BBBBBB",
                  }}
                />
              }
              title="Report"
              subtitle="Export & Share mission results"
              titleColor={ColorSchema.CREATOR_COLOR_ICON}
              subtitleColor="rgba(66, 93, 126, 0.62)"
            />
          </TouchableOpacity>

          <TouchableOpacity
            className="my-2 px-4"
            onPress={() => navigate.navigate(ROUTES.CREATE_TRACE_REPORT)}
          >
            <SingleMissionCard
              iconLeft={
                <TruckIcon
                  style={{
                    width: 24,
                    height: 25,
                    color: ColorSchema.CREATOR_COLOR_ICON,
                  }}
                />
              }
              iconRight={
                <ArrowRightIcon
                  style={{
                    width: 20,
                    height: 20,
                    color: "#BBBBBB",
                  }}
                />
              }
              title="Trace Report"
              subtitle="Track your mission results"
              titleColor={ColorSchema.CREATOR_COLOR_ICON}
              subtitleColor="rgba(66, 93, 126, 0.62)"
            />
          </TouchableOpacity>

          <TouchableOpacity
            className="my-6 items-center"
            onPress={() => navigate.navigate(ROUTES.CREATE_QR_SCANNER)}
          >
            <Ionicons
              name="ios-qr-code-outline"
              size={70}
              color={ColorSchema.CREATOR_COLOR_ICON}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default memo(CreatorMissionSingleScreen);
