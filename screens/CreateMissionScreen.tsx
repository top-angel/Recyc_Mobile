import { View, ScrollView, Text, RefreshControl } from "react-native";
import { memo, FC, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import DetailsRecycliumOptionCard from "components/global/DetailsRecycliumOptionCard";
import Title from "../components/global/Title";
import { useShowNavigationHeader } from "../hooks/useShowNavigationHeader";
import { RootStackParamList, ROUTES } from "../navigation/NavigationTypes";
import CreatorHomeBanner from "../components/createMissions/CreatorHomeBanner";
import DetailsOptionCard from "../components/global/DetailsOptionCard";
import CreditCardIcon from "../components/icons/CreditCardIcon";
import ArrowRightIcon from "../components/icons/ArrowRightIcon";
import UserIcon from "../components/icons/UserIcon";
import MessageCircleIcon from "../components/icons/MessageCircleIcon";
import { useLogin } from "../hooks/creators/useLogin";
import { useCreateEthAccount } from "../hooks/creators/useCreateEthAccount";
import { useGetPrivateKey } from "../hooks/creators/useGetPrivateKey";
import { useCheckUserRegistered } from "../hooks/creators/useCheckUserRegistered";
import { useRegisterUser } from "../hooks/creators/useRegisterUser";
import { useGetNonce } from "../hooks/creators/useGetNonce";
import { useSetTokens } from "../hooks/creators/useSetTokens";
import Spinner from "../components/global/Spinner";
import { useFetchMissionsOnLoad } from "../hooks/creators/useFetchMissionsOnLoad";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { ColorSchema } from "../enums/colorSchema";
import { refreshAccessToken } from "../redux/auth/authRefreshToken/authRefreshToken.actions";
import { wait } from "../lib/waitTimeout";
import { getUserNonce } from "../redux/auth/authGetNonce/authGetNonce.actions";
import { useGetTokens } from "../hooks/creators/useGetTokens";
import HeaderTitle from "../components/header/HeaderTitle";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  ROUTES.CREATE_MISSION
>;

const CreateMissionScreen: FC = () => {
  const navigate = useNavigation<NavigationProp>();

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isRegistered, setIsRegistered] = useState<boolean | undefined>(
    undefined,
  );
  const [accessToken, setAccessToken] = useState<string>("");
  const [refreshToken, setRefreshToken] = useState<string>("");

  const { total } = useAppSelector((state) => state.missionsGetByUser);
  const dispatch = useAppDispatch();

  /* Show navigation header */
  useShowNavigationHeader({
    headerColor: ColorSchema.CREATOR_COLOR,
    isBackVisible: true,
    isTitleVisible: true,
    navigateToHome: ROUTES.HOME,
  });

  /** ON LOAD GET PRIVATE COLLECTOR KEY */
  const { privateKey, loading } = useGetPrivateKey();

  /** CREATE ETH WALLET WITH PRIVATE KEY */
  const { publicAddress } = useCreateEthAccount({ privateKey });

  /** CHECK IF USER IS REGISTERED */
  useCheckUserRegistered({ setIsRegistered });

  /** IF isRegistered is false, CALL END-POINT TO REGISTER */
  useRegisterUser({ publicAddress, isRegistered });

  /** GET TOKENS FROM SECURE STORE */
  useGetTokens({ setAccessToken, setRefreshToken });

  /** GET NONCE FROM SERVER */
  useGetNonce({ publicAddress, isRegistered });

  /** LOGIN USER */
  useLogin({ publicAddress, isRegistered, privateKey });

  /** SET ACCESS AND REFRESH TOKEN INTO EXPO STORAGE */
  useSetTokens();

  /** FETCH CREATED MISSIONS ON LOAD */
  useFetchMissionsOnLoad();

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

  return (
    <SafeAreaView className="flex-1 bg-01-creator-background-color">
      {loading ? <Spinner /> : null}
      <View className="flex-1 bg-red-400justify-between">
        <View className="flex p-4">
          <View className="flex flex-row justify-between">
            <HeaderTitle navigateToHome={ROUTES.HOME} />
            <CreatorHomeBanner />
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
              onRefresh={onRefresh}
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
            />
            <View className="flex mt-5" />
            <DetailsRecycliumOptionCard
              title="Storer"
              subtitle="Register your depot, store scanned items and return them back to the mission creators."
              titleColor={ColorSchema.STORER_COLOR_ICON}
              subtitleColor={ColorSchema.STORER_COLOR_TITLE}
              buttonColor={ColorSchema.STORER_COLOR}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default memo(CreateMissionScreen);
