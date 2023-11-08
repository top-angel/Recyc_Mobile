import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { memo, FC, useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "components/header/BackButton";
import HeaderTitle from "components/header/HeaderTitle";
import DetailsOptionCard from "../components/global/DetailsOptionCard";
import Spinner from "../components/global/Spinner";
import Title from "../components/global/Title";
import ArrowRightIcon from "../components/icons/ArrowRightIcon";
import BottleIcon from "../components/icons/BottleIcon";
import CameraIcon from "../components/icons/CameraIcon";
import CreditCardIcon from "../components/icons/CreditCardIcon";
import MaximizeIcon from "../components/icons/MaximizeIcon";
import MessageCircleIcon from "../components/icons/MessageCircleIcon";
import UserIcon from "../components/icons/UserIcon";
import StorageDetails from "../components/verify-storage/StorageDetails";
import { ColorSchema } from "../enums/colorSchema";
import { useCreateEthAccount } from "../hooks/creators/useCreateEthAccount";
import { useGetNonce } from "../hooks/creators/useGetNonce";
import { useGetTokens } from "../hooks/creators/useGetTokens";
import { useLogin } from "../hooks/creators/useLogin";
import { useSetTokens } from "../hooks/creators/useSetTokens";
import { useCheckUserRegistered } from "../hooks/storer/useCheckUserRegistered";
import { useFetchStorerProfileOnLoad } from "../hooks/storer/useFetchStorerProfileOnLoad";
import { useGetPrivateKey } from "../hooks/storer/useGetPrivateKey";
import { useRegisterUser } from "../hooks/storer/useRegisterUser";
import { useShowNavigationHeader } from "../hooks/useShowNavigationHeader";
import { wait } from "../lib/waitTimeout";
import { RootStackParamList, ROUTES } from "../navigation/NavigationTypes";
import { getUserNonce } from "../redux/auth/authGetNonce/authGetNonce.actions";
import { refreshAccessToken } from "../redux/auth/authRefreshToken/authRefreshToken.actions";
import { useAppDispatch } from "../redux/hooks";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  ROUTES.VERIFY_AND_STORAGE_HOME
>;

const StorerStorageScreen: FC = () => {
  const navigate = useNavigation<NavigationProp>();

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isRegistered, setIsRegistered] = useState<boolean | undefined>(
    undefined,
  );
  const [accessToken, setAccessToken] = useState<string>("");
  const [refreshToken, setRefreshToken] = useState<string>("");

  const dispatch = useAppDispatch();

  /* Show navigation header */
  useShowNavigationHeader({
    headerColor: ColorSchema.STORER_COLOR,
    isBackVisible: true,
    isTitleVisible: true,
    navigateToHome: ROUTES.HOME,
  });

  /** GET PRIVATE KEY FROM SECURE STORE */
  const { privateKey } = useGetPrivateKey();

  /** CREATE ETH WALLET WITH PRIVATE KEY */
  const { publicAddress } = useCreateEthAccount({ privateKey });

  /** FETCH STORER PROFILE ON LOAD */
  const { loading } = useFetchStorerProfileOnLoad({ publicAddress });

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
    <SafeAreaView className="flex-1 bg-03-green-mission">
      {loading ? <Spinner /> : null}
      <View className="flex flex-row justify-between h-12 items-center px-8">
        <BackButton />
        <HeaderTitle navigateToHome={ROUTES.HOME} bigIcon />
        <View className="w-6" />
      </View>
      <ScrollView
        // style={StyleSheet.absoluteFillObject}
        className="bg-03-green-mission flex-1 p-0 mt-3"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#FFFFFF"
            progressBackgroundColor="#FFFFFF"
          />
        }
      >
        <View className="flex-1 p-4 pt-1">
          <Title title="Your storage" textColor="#FFFFFF" />

          <StorageDetails />

          <TouchableOpacity
            className="mt-4"
            onPress={() => navigate.navigate(ROUTES.VERIFY_AND_STORAGE_PROFILE)}
          >
            <DetailsOptionCard
              title="Profile"
              subtitle="Your Storer Profile"
              iconLeft={
                <UserIcon
                  style={{
                    width: 24,
                    height: 24,
                    color: ColorSchema.STORER_COLOR_ICON,
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
              titleColor={ColorSchema.STORER_COLOR_ICON}
              subtitleColor="rgba(30, 83, 85, 0.62)"
            />
          </TouchableOpacity>

          <TouchableOpacity
            className="mt-4"
            onPress={() => navigate.navigate(ROUTES.VERIFY_AND_STORAGE_CHAT)}
          >
            <DetailsOptionCard
              title="Chat"
              subtitle="2 Unread Messages"
              iconLeft={
                <MessageCircleIcon
                  style={{
                    width: 24,
                    height: 24,
                    color: ColorSchema.STORER_COLOR_ICON,
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
              titleColor={ColorSchema.STORER_COLOR_ICON}
              subtitleColor="rgba(30, 83, 85, 0.62)"
            />
          </TouchableOpacity>

          <TouchableOpacity
            className="mt-4"
            onPress={() =>
              navigate.navigate(ROUTES.VERIFY_AND_STORAGE_WALLET, {
                publicAddress,
                privateKey,
              })
            }
            // onPress={() => navigate.navigate(ROUTES.VERIFY_AGGREGATED_CODES)}
          >
            <DetailsOptionCard
              title="Wallet"
              subtitle="439.38$ Earned so far"
              iconLeft={
                <CreditCardIcon
                  style={{
                    width: 24,
                    height: 24,
                    color: ColorSchema.STORER_COLOR_ICON,
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
              titleColor={ColorSchema.STORER_COLOR_ICON}
              subtitleColor="rgba(30, 83, 85, 0.62)"
            />
          </TouchableOpacity>

          <TouchableOpacity
            className="mt-8"
            onPress={() =>
              navigate.navigate(ROUTES.VERIFY_QR_SCANNER_HANDSHAKE)
            }
          >
            <View className="flex flex-row justify-center">
              <CameraIcon />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default memo(StorerStorageScreen);
