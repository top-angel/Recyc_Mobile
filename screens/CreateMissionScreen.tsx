import {
  View,
  ScrollView,
  Text,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { memo, FC, useState, useEffect } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import DetailsRecycliumOptionCard from "components/global/DetailsRecycliumOptionCard";
import { useGetStorerPublicAddress } from "hooks/storer/useGetStorerPublicAddress";
import { useFetchStorerProfileOnLoad } from "hooks/storer/useFetchStorerProfileOnLoad";
import { StorageType } from "enums/storageTypes";
import { wait } from "lib/waitTimeout";
import { useGetCreatorPublicAddress } from "hooks/aggregates/useGetCreatorPublicAddress";
import { getStorerProfile } from "redux/storers/storerGetProfile/storerGetProfile.action";
import { useShowNavigationHeader } from "../hooks/useShowNavigationHeader";
import { RootStackParamList, ROUTES } from "../navigation/NavigationTypes";
import CreatorHomeBanner from "../components/createMissions/CreatorHomeBanner";
import Spinner from "../components/global/Spinner";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { ColorSchema } from "../enums/colorSchema";
import { getUserNonce } from "../redux/auth/authGetNonce/authGetNonce.actions";
import HeaderTitle from "../components/header/HeaderTitle";
import { useGetCollectorPublicAddress } from "../hooks/aggregates/useGetCollectorPublicAddress";
import { getValueFromSecureStore } from "../lib/secureStore";
import { getCreatorProfile } from "../redux/creators/creatorGetProfile/creatorGetProfile.action";
import { getCollectorProfile } from "../redux/collector/collectorGetProfile/collectorGetProfile.action";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  ROUTES.COLLECT_REGISTRATION,
  ROUTES.COLLECT_MISSIONS
>;

const CreateMissionScreen: FC = () => {
  const navigate = useNavigation<NavigationProp>();

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isRegistered, setIsRegistered] = useState<boolean | undefined>(
    undefined,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string>("");
  const [accessTokenCreator, setAccessTokenCreator] = useState<string>("");

  const [nextScreen, setNextScreen] = useState<string>("");

  const { total } = useAppSelector((state) => state.missionsGetByUser);
  const dispatch = useAppDispatch();

  const { nonce, success, status } = useAppSelector(
    (state) => state.authGetNonce,
  );

  useEffect(() => {
    if (success && status === "exists") {
      setIsLoading(false);
      setNextScreen("");
      if (nextScreen === "Collector") {
        navigate.navigate(ROUTES.COLLECT_MISSIONS);
      }
      if (nextScreen === "Storer") {
        const moveToStore = async () => {
          const accessTokCreator = await getValueFromSecureStore(
            StorageType.ACCESS_TOKEN,
          );
          const accessTokStorer = await getValueFromSecureStore(
            StorageType.ACCESS_STORER_TOKEN,
          );
          if (accessTokCreator) {
            Toast.show({
              type: "error",
              text1: "You are already a creator, you cannot become a storer.",
            });
          } else {
            navigate.navigate(ROUTES.VERIFY_AND_STORAGE);
          }
        };
        moveToStore();
      }
    }
    if (success && status === "not found") {
      setIsLoading(false);
      setNextScreen("");
      if (nextScreen === "Collector") {
        navigate.navigate(ROUTES.COLLECT_REGISTRATION);
      }
      if (nextScreen === "Storer") {
        navigate.navigate(ROUTES.VERIFY_AND_STORAGE);
      }
    }
  }, [success, status, navigate, nextScreen]);

  /* Show navigation header */
  useShowNavigationHeader({
    headerColor: ColorSchema.CREATOR_COLOR,
    isBackVisible: true,
    isTitleVisible: true,
    navigateToHome: ROUTES.HOME,
  });

  /** FETCH COLLECTOR and Storer WALLET ADDRESS */
  const publicAddressCollector = useGetCollectorPublicAddress();
  const publicAddressStorer = useGetStorerPublicAddress();
  const publicAddressCreator = useGetCreatorPublicAddress();

  const onPressStart = async (val: string) => {
    setNextScreen(val);
    if (val === "Collector") {
      setIsLoading(false);
      setIsLoading(true);

      dispatch(
        getUserNonce({ public_address: publicAddressCollector.publicAddress }),
      );
    } else {
      setIsLoading(true);
      const accessTokCreator = await getValueFromSecureStore(
        StorageType.ACCESS_TOKEN,
      );
      const accessTokStorer = await getValueFromSecureStore(
        StorageType.ACCESS_STORER_TOKEN,
      );
      if (accessTokCreator) {
        setIsLoading(false);
        Toast.show({
          type: "error",
          text1: "You are already a creator, you cannot become a storer.",
        });
      } else {
        setIsLoading(false);
        dispatch(
          getUserNonce({ public_address: publicAddressStorer.publicAddress }),
        );
        dispatch(getStorerProfile({ accessToken: accessTokStorer }));
      }
    }
  };

  const onClickedCreator = async () => {
    const accessTokCreator = await getValueFromSecureStore(
      StorageType.ACCESS_TOKEN,
    );
    const accessTokStorer = await getValueFromSecureStore(
      StorageType.ACCESS_STORER_TOKEN,
    );
    if (accessTokStorer) {
      Toast.show({
        type: "error",
        text1: "You are already a storer, you cannot become a creator.",
      });
    } else {
      dispatch(
        getUserNonce({ public_address: publicAddressCreator.publicAddress }),
      );
      dispatch(getCreatorProfile({ accessToken: accessTokCreator }));
      navigate.navigate(ROUTES.CREATE_MISSION_CREATE);
    }
  };

  /** FETCH STORER PROFILE ON LOAD */
  // const { loading } = useFetchStorerProfileOnLoad({
  //   accessToken,
  //   publicAddress: publicAddressStorer.publicAddress,
  // });

  // wait(300).then(async () => {
  //   const accessTok = await getValueFromSecureStore(
  //     StorageType.ACCESS_STORER_TOKEN,
  //   );
  //   setAccessToken(accessTok);

  //   const accessTokCreator = await getValueFromSecureStore(
  //     StorageType.ACCESS_TOKEN,
  //   );
  //   setAccessTokenCreator(accessTokCreator);
  // });

  return (
    <SafeAreaView className="flex-1 bg-01-creator-background-color">
      {isLoading ? <Spinner /> : null}
      <View className="flex-1 bg-red-400justify-between">
        <View className="flex p-4">
          <View className="flex flex-row justify-between">
            <HeaderTitle navigateToHome={ROUTES.HOME} />
            <TouchableOpacity
              className="flex flex-row"
              onPress={onClickedCreator}
            >
              <CreatorHomeBanner />
            </TouchableOpacity>
          </View>
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[30px] font-medium text-[#FFFFFF] mt-6"
          >
            Welcome to Recyclium{`\n`}mobile app
          </Text>
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[16px] font-normal text-[#FFFFFF] mt-4"
          >
            Select your role to continue
          </Text>
        </View>

        <ScrollView
          className="flex-1 bg-white"
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              // onRefresh={onRefresh}
              tintColor="#FFFFFF"
              progressBackgroundColor="#FFFFFF"
            />
          }
        >
          <View className="flex-1 h-full mt-1 p-4 bg-white">
            <DetailsRecycliumOptionCard
              title="Collector"
              subtitle="Claim missions, scan items and deliver them to storers to earn rewards and more !"
              titleColor={ColorSchema.COLLECTOR_COLOR}
              subtitleColor={ColorSchema.COLLECTOR_COLOR_ICON}
              buttonColor={ColorSchema.COLLECTOR_COLOR}
              onPressStart={() => onPressStart("Collector")}
            />
            <View className="flex mt-5" />
            <DetailsRecycliumOptionCard
              title="Storer"
              subtitle="Register your depot, store scanned items and return them back to the mission creators."
              titleColor={ColorSchema.STORER_COLOR_ICON}
              subtitleColor={ColorSchema.STORER_COLOR_TITLE}
              buttonColor={ColorSchema.STORER_COLOR}
              onPressStart={() => onPressStart("Storer")}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default memo(CreateMissionScreen);
