import {
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Modal,
  Text,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { memo, FC, useState, useRef, useEffect, useMemo } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import Carousel from "react-native-snap-carousel";
import CameraCollectorIcon from "components/icons/CameraCollectorIcon";
import MissionIcon from "components/icons/MissionIcon";
import BackButton from "components/header/BackButton";
import HeaderTitle from "components/header/HeaderTitle";
import { useShowNavigationHeader } from "../hooks/useShowNavigationHeader";
import { RootStackParamList, ROUTES } from "../navigation/NavigationTypes";
import { useCreateEthAccount } from "../hooks/creators/useCreateEthAccount";
import { useGetPrivateKey } from "../hooks/collectors/useGetPrivateKey";
import { useCheckUserRegistered } from "../hooks/collectors/useCheckUserRegistered";
import { useRegisterUser } from "../hooks/collectors/useRegisterUser";
import { useGetNonce } from "../hooks/creators/useGetNonce";
import { useLogin } from "../hooks/creators/useLogin";
import { useSetTokens } from "../hooks/creators/useSetTokens";
import { useFetchAllMissionsOnLoad } from "../hooks/collectors/useFetchAllMissionsOnLoad";
import CollectorMissionSearch from "../components/collectors/CollectorMissionSearch";
import Spinner from "../components/global/Spinner";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import MissionInProgressCard from "../components/collectors/MissionInProgressCard";
import DetailsOptionCard from "../components/global/DetailsOptionCard";
import CreditCardIcon from "../components/icons/CreditCardIcon";
import ArrowRightIcon from "../components/icons/ArrowRightIcon";
import UserIcon from "../components/icons/UserIcon";
import MessageCircleIcon from "../components/icons/MessageCircleIcon";
import ModalMissionFilter from "../components/collectors/ModalMissionFilter";
import { ColorSchema } from "../enums/colorSchema";
import { getMissionInProgress } from "../redux/missions/missionGetInProgress/missionGetInProgress.actions";
import { useGetTokens } from "../hooks/creators/useGetTokens";
import { refreshAccessToken } from "../redux/auth/authRefreshToken/authRefreshToken.actions";
import { getUserNonce } from "../redux/auth/authGetNonce/authGetNonce.actions";
import { wait } from "../lib/waitTimeout";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  ROUTES.COLLECT_MISSIONS
>;

const CollectMissionsScreen: FC = () => {
  const { width } = Dimensions.get("window");

  const navigate = useNavigation<NavigationProp>();

  const [privateKey, setPrivateKey] = useState<string>("");
  const [isRegistered, setIsRegistered] = useState<boolean | undefined>(
    undefined,
  );
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string>("");
  const [refreshToken, setRefreshToken] = useState<string>("");

  const { result } = useAppSelector((state) => state.missionsGetAll);
  const { missions: missionsClaimed } = useAppSelector(
    (state) => state.missionClaim,
  );
  const { images } = useAppSelector((state) => state.linkGetAll);
  const dispatch = useAppDispatch();

  const ref = React.useRef(null);

  /* Show navigation header */
  useShowNavigationHeader({
    headerColor: ColorSchema.COLLECTOR_COLOR,
    isBackVisible: true,
    isTitleVisible: true,
    navigateToHome: ROUTES.HOME,
  });

  /** ON LOAD GET PRIVATE COLLECTOR KEY */
  const { loading } = useGetPrivateKey({ setPrivateKey });

  /** CREATE ETH WALLET WITH PRIVATE KEY */
  const { publicAddress } = useCreateEthAccount({ privateKey });

  /** CHECK IF USER IS REGISTERED */
  useCheckUserRegistered({ setIsRegistered });

  /** IF isRegistered is false, CALL END-POINT TO REGISTER */
  useRegisterUser({ publicAddress, isRegistered });

  /** GET NONCE FROM SERVER */
  useGetNonce({ publicAddress, isRegistered });

  /** LOGIN USER */
  useLogin({ publicAddress, isRegistered, privateKey });

  /** GET TOKENS FROM SECURE STORE */
  useGetTokens({ setAccessToken, setRefreshToken });

  /** SET ACCESS AND REFRESH TOKEN INTO EXPO STORAGE */
  useSetTokens();

  /** FETCH MISSION SMALL PART ON LOAD */
  useFetchAllMissionsOnLoad();

  // const viewConfig = {
  //   viewAreaCoveragePercentThreshold: 50,
  //   waitForInteraction: true,
  // };

  const handleRedirect = (bountyId: string) => {
    if (bountyId && accessToken) {
      dispatch(getMissionInProgress({ accessToken, bountyId }));
      navigate.navigate(ROUTES.COLLECT_EXPLORE_REDIRECTION);
    }
  };

  /** ON REFRESH LOAD DATA */
  const onRefresh = () => {
    setRefreshing(true);
    if (refreshToken && accessToken) {
      Promise.all([
        dispatch(refreshAccessToken({ refresh_token: refreshToken })),
        dispatch(getUserNonce({ public_address: publicAddress })),
      ]);
    }
    wait(300).then(() => setRefreshing(false));
  };

  const foundedLink = useMemo(
    () => (bountyid: string) => {
      const link = images.find((item) => item.bountyid === bountyid);

      if (!link) {
        return "";
      }

      return link.image.path;
    },
    [images],
  );

  const renderItem = ({ item, index }) => {
    console.log('---->>>', item.id)
    return (
      <TouchableOpacity onPress={() => handleRedirect(item.id)} key={item.id}>
        <MissionInProgressCard
          mission={item}
          itemWidth={width * 0.75}
          linkedImage={foundedLink(item.id)}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-02-purple-mission">
      {loading ? <Spinner /> : null}
      <View className="flex flex-row justify-between h-12 items-center px-8">
        <BackButton />
        <HeaderTitle navigateToHome={ROUTES.HOME} bigIcon />
        <View className="w-6" />
      </View>
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
        <CollectorMissionSearch setModalVisible={setModalVisible} />

        <Carousel
          layout="default"
          layoutCardOffset={9}
          ref={ref}
          data={result}
          renderItem={renderItem}
          sliderWidth={width}
          itemWidth={width * 0.7}
          // onSnapToItem={(index) => setIndex(index)}
          useScrollView
        />

        <View className="flex-1 flex-row bg-red-300 p-1 m-4 rounded-xl bg-[#10182880]/[0.5] items-center justify-center">
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[16px] leading-[36px] font-medium text-white mr-2"
          >
            Explore Missions
          </Text>
          <MissionIcon />
        </View>

        <View className="p-4">
          <TouchableOpacity
            className="mt-1"
            onPress={() => navigate.navigate(ROUTES.COLLECT_MISSION_CLAIMED)}
          >
            <View>
              <DetailsOptionCard
                title="Claimed missions"
                subtitle={`${missionsClaimed.length} missions claimed`}
                titleColor={ColorSchema.CREATOR_COLOR_ICON}
                subtitleColor="rgba(30, 83, 85, 0.62)"
                iconLeft={
                  <CreditCardIcon
                    style={{
                      width: 24,
                      height: 24,
                      color: ColorSchema.COLLECTOR_COLOR_ICON,
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
              />
              {missionsClaimed.length > 0 ? (
                <View className="absolute top-7 right-10 w-[15px] h-[15px] rounded-[67px] bg-[#DD7777] justify-center items-center">
                  <Text
                    style={{ fontFamily: "Nunito" }}
                    className="text-[9px] leading-[10px] font-semibold text-[#FFFFFF] text-center"
                  >
                    {missionsClaimed.length}
                  </Text>
                </View>
              ) : null}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            className="mt-4"
            onPress={() => navigate.navigate(ROUTES.COLLECT_PROFILE)}
          >
            <DetailsOptionCard
              title="Profile"
              subtitle="Your collector profile"
              titleColor={ColorSchema.CREATOR_COLOR_ICON}
              subtitleColor="rgba(30, 83, 85, 0.62)"
              iconLeft={
                <UserIcon
                  style={{
                    width: 24,
                    height: 24,
                    color: ColorSchema.COLLECTOR_COLOR_ICON,
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
            />
          </TouchableOpacity>

          <TouchableOpacity
            className="mt-4"
            onPress={() => navigate.navigate(ROUTES.COLLECT_MISSION_CHAT)}
          >
            <DetailsOptionCard
              title="Chat"
              subtitle="2 Unreed messages"
              titleColor={ColorSchema.CREATOR_COLOR_ICON}
              subtitleColor="rgba(30, 83, 85, 0.62)"
              iconLeft={
                <MessageCircleIcon
                  style={{
                    width: 24,
                    height: 24,
                    color: ColorSchema.COLLECTOR_COLOR_ICON,
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
            />
          </TouchableOpacity>

          <TouchableOpacity
            className="mt-4"
            onPress={() =>
              navigate.navigate(ROUTES.COLLECT_WALLET_DETAILS, {
                publicAddress,
                privateKey,
              })
            }
          >
            <DetailsOptionCard
              title="Wallet"
              subtitle="439.38$ Earned so far"
              titleColor={ColorSchema.CREATOR_COLOR_ICON}
              subtitleColor="rgba(30, 83, 85, 0.62)"
              iconLeft={
                <CreditCardIcon
                  style={{
                    width: 24,
                    height: 24,
                    color: ColorSchema.COLLECTOR_COLOR_ICON,
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
            />
          </TouchableOpacity>

          <TouchableOpacity
            className="mt-8 mb-4"
            onPress={() => navigate.navigate(ROUTES.COLLECT_QR_SCANNER)}
          >
            <View className="flex flex-row justify-center">
              <CameraCollectorIcon />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        transparent
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <ModalMissionFilter setModalVisible={setModalVisible} />
      </Modal>
    </SafeAreaView>
  );
};

export default memo(CollectMissionsScreen);
