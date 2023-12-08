import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  RefreshControl,
  Modal,
} from "react-native";
import { FC, memo, useCallback, useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Wallet } from "ethers";
import { id } from "ethers/lib/utils";
import BackButton from "components/header/BackButton";
import HeaderTitle from "components/header/HeaderTitle";
import ModalMissionCreateThanks from "components/collectors/ModalMissionCreateThanks";
import { loginUser } from "redux/auth/authLogin/authLogin.actions";
import { useGetPrivateKey } from "hooks/creators/useGetPrivateKey";
import { getCreatorProfile } from "redux/creators/creatorGetProfile/creatorGetProfile.action";
import {
  getValueFromSecureStore,
  setValueIntoSecureCode,
} from "lib/secureStore";
import { StorageType } from "enums/storageTypes";
import { useSetTokens } from "hooks/creators/useSetTokens";
import { useGetCreatorPublicAddress } from "hooks/aggregates/useGetCreatorPublicAddress";
import ModalApplicationVerified from "components/verify-storage/ModalApplicationVerified";
import { useLogin } from "hooks/creators/useLogin";
import { useShowNavigationHeader } from "../hooks/useShowNavigationHeader";
import { ROUTES } from "../navigation/NavigationTypes";
import { useGetLocation } from "../hooks/creators/useGetLocation";
import Title from "../components/global/Title";
import { wait } from "../lib/waitTimeout";
import { useGetTokens } from "../hooks/creators/useGetTokens";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { refreshAccessToken } from "../redux/auth/authRefreshToken/authRefreshToken.actions";
import { useOnSuccessRefreshToken } from "../hooks/creators/useOnSuccessRefreshToken";
import CreateMissionInputFields from "../components/createMissions/CreateMissionInputFields";
import { CreatorDoc } from "../redux/creators/creators.types";
import CreateMissionButtons from "../components/createMissions/CreateMissionButtons";
import Spinner from "../components/global/Spinner";
import { BountyType } from "../enums/bountyType";
import { checkMissionCreate } from "../lib/checkers";
import { createNewMission } from "../redux/creators/creatorCreateMission/creatorCreateMission.actions";
import { ColorSchema } from "../enums/colorSchema";
import { getUserNonce } from "../redux/auth/authGetNonce/authGetNonce.actions";

const CreatorCreateScreen: FC = () => {
  const { nonce, success } = useAppSelector((state) => state.creatorMissionNew);
  const { result } = useAppSelector((state) => state.creatorGetProfile);
  const { status, access_token } = useAppSelector((state) => state.authLogin);

  const isIos = Platform.OS === "ios" || Platform.OS === "macos";

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string>("");
  const [refreshToken, setRefreshToken] = useState<string>("");
  const [bounty, setBounty] = useState<Bounty>({
    companyName: "",
    email: "",
    address: "",
    country: "",
  });
  const [itemsCount, setItemsCount] = useState<number>(450000);
  const [image, setImage] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [formDataFile, setFormDataFile] = useState<FormDataFile>();
  const [isTerms, setIsTerms] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalVerifyVisiable, setModalVerifyVisiable] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  /* Show navigation header */
  useShowNavigationHeader({
    headerColor: ColorSchema.CREATOR_COLOR,
    isBackVisible: true,
    isTitleVisible: true,
    navigateToHome: ROUTES.HOME,
  });

  /** TAKE AUTH TOKENS FROM STORAGE */
  // useGetTokens({ setAccessToken, setRefreshToken });

  /** UPDATE ACCESS TOKEN ON REFRESH TOKEN */
  // useOnSuccessRefreshToken({ setAccessToken });

  /** FETCH Creator WALLET ADDRESS */
  const { publicAddress } = useGetCreatorPublicAddress();

  /** GET PRIVATE KEY FROM SECURE STORE */
  const { privateKey } = useGetPrivateKey();

  /** LOGIN USER */
  // useLogin({ publicAddress, isRegistered: true, privateKey });

  /** SET ACCESS AND REFRESH TOKEN INTO EXPO STORAGE */
  // useSetTokens();

  useEffect(() => {
    const checker = checkMissionCreate({
      bounty,
      itemsCount,
      image,
      startDate,
      endDate,
    });
    if (success && checker) {
      setIsLoading(false);
      (async () => {
        const signer = new Wallet(id(privateKey));
        const sig = await signer.signMessage(nonce.toString());
        dispatch(
          loginUser({
            public_address: publicAddress,
            signature: sig,
          }),
        );
      })();

      setModalVisible(true);
    } else {
      setIsLoading(false);
    }
  }, [bounty, success]);

  useEffect(() => {
    setBounty({
      companyName: result ? result.profile.company_title : "",
      email: result ? result.profile.email : "",
      address: result ? result.profile.address : "",
      country: result ? result.profile.country : "",
    });
    if (!result) {
      setModalVisible(false);
      setModalVerifyVisiable(false);
    } else if (result.status === "new") {
      setModalVisible(true);
    } else if (result.status === "verified") {
      setModalVerifyVisiable(true);
    } else {
      setModalVisible(false);
      setModalVerifyVisiable(false);
    }
  }, [result]);

  useEffect(() => {
    const secureToStore = async (token: string) => {
      await setValueIntoSecureCode(StorageType.ACCESS_TOKEN, token);
    };
    if (status === "success") {
      secureToStore(access_token);
    }
  }, [access_token, status]);

  const handleChange = useCallback(
    (key: keyof CreatorDoc) => (text: string) => {
      setBounty({
        ...bounty,
        [key]: text,
      });
    },
    [bounty, setBounty],
  );

  const handleCreate = () => {
    const checker = checkMissionCreate({
      bounty,
      itemsCount,
      image,
      startDate,
      endDate,
    });

    if (checker) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("company_title", bounty.companyName);
      formData.append("email", bounty.email);
      formData.append("address", bounty.address);
      formData.append("country", bounty.country);
      formData.append("public_address", publicAddress);
      formData.append("source", "recyclium");
      formData.append("image", formDataFile as unknown as Blob);

      Promise.all([
        dispatch(
          createNewMission({
            formData,
            accessToken,
          }),
        ),
        dispatch(getUserNonce({ public_address: publicAddress })),
      ]);
    }
  };

  /** ON REFRESH LOAD DATA */
  // const onRefresh = () => {
  //   setRefreshing(true);
  //   if (refreshToken) {
  //     dispatch(refreshAccessToken({ refresh_token: refreshToken }));
  //   }
  //   wait(300).then(() => setRefreshing(false));
  // };

  return (
    <SafeAreaView className="flex-1 bg-01-creator-background-dark-color">
      {isLoading ? <Spinner /> : null}
      <View className="flex flex-row justify-between h-12 items-center px-8">
        <BackButton />
        <HeaderTitle navigateToHome={ROUTES.HOME} bigIcon />
        <View className="w-6" />
      </View>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={isIos ? "padding" : "height"}
        keyboardVerticalOffset={100}
      >
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          style={StyleSheet.absoluteFillObject}
        >
          <ScrollView
            className="flex-1 bg-01-creator-background-dark-color mt-4"
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                // onRefresh={onRefresh}
                tintColor="#FFFFFF"
                progressBackgroundColor="#FFFFFF"
              />
            }
          >
            <View className="flex-1 px-4 py-2">
              <Title title="Mission Creator Application" textColor="#FFFFFF" />

              <CreateMissionInputFields
                bounty={bounty}
                handleChange={handleChange}
                itemsCount={itemsCount}
                setItemsCount={setItemsCount}
                image={image}
                setImage={setImage}
                accessToken={accessToken}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                setFormDataFile={setFormDataFile}
                setIsTerms={setIsTerms}
              />
            </View>
            <CreateMissionButtons
              isTerms={isTerms}
              handleCreate={handleCreate}
            />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <Modal
        transparent
        animationType="slide"
        visible={modalVisible}
        statusBarTranslucent
        onRequestClose={() => setModalVisible(false)}
      >
        <ModalMissionCreateThanks
          setModalVisible={setModalVisible}
          from="Home"
        />
      </Modal>
      <Modal
        transparent
        animationType="slide"
        visible={modalVerifyVisiable}
        statusBarTranslucent
        onRequestClose={() => setModalVerifyVisiable(false)}
      >
        <ModalApplicationVerified
          setModalVerifyVisiable={setModalVerifyVisiable}
          from="Creator"
        />
      </Modal>
    </SafeAreaView>
  );
};

export default memo(CreatorCreateScreen);
