import {
  View,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
  Modal,
  Text,
} from "react-native";
import { memo, FC, useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Wallet } from "ethers";
import { id } from "ethers/lib/utils";
import BackButton from "components/header/BackButton";
import HeaderTitle from "components/header/HeaderTitle";
import CheckboxOption from "components/global/CheckboxOption";
import ModalMissionCreateThanks from "components/collectors/ModalMissionCreateThanks";
import { StorersDoc } from "redux/storers/storers.types";
import { useGetStorerPublicAddress } from "hooks/storer/useGetStorerPublicAddress";
import { useCheckUserRegistered } from "hooks/storer/useCheckUserRegistered";
import { useSetTokens } from "hooks/storer/useSetTokens";
import { getUserNonce } from "redux/auth/authGetNonce/authGetNonce.actions";
import ModalApplicationVerified from "components/verify-storage/ModalApplicationVerified";
import { useLogin } from "hooks/creators/useLogin";
import { loginStorerUser } from "redux/auth/authStorerLogin/authStorerLogin.actions";
import { getStorerProfile } from "redux/storers/storerGetProfile/storerGetProfile.action";
import { useGetTokens } from "hooks/storer/useGetTokens";
import { useGetAccessToken } from "hooks/storer/useGetAccessToken";
import { setValueIntoSecureCode } from "lib/secureStore";
import { StorageType } from "enums/storageTypes";
import { useShowNavigationHeader } from "../hooks/useShowNavigationHeader";
import { ROUTES } from "../navigation/NavigationTypes";
import StorerInputFields from "../components/verify-storage/StorerInputFields";
import SubmitButton from "../components/verify-storage/SubmitButton";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { ColorSchema } from "../enums/colorSchema";
import { useGetPrivateKey } from "../hooks/storer/useGetPrivateKey";
import { createNewStorer } from "../redux/storers/storerCreateNew/storerCreateNew.action";
import Spinner from "../components/global/Spinner";
import { useGetLocation } from "../hooks/creators/useGetLocation";
import { useOnSuccessRefreshToken } from "../hooks/creators/useOnSuccessRefreshToken";
import { checkStorerApplication } from "../lib/checkers";

const VerifyAndStorageScreen: FC = () => {
  const { nonce, success } = useAppSelector((state) => state.storerCreateNew);
  const { status, access_token } = useAppSelector(
    (state) => state.authStorerLogin,
  );
  const { result } = useAppSelector((state) => state.storerGetProfile);

  const dispatch = useAppDispatch();

  const isIos = Platform.OS === "ios" || Platform.OS === "macos";

  const [application, setApplication] = useState<StorersDoc>({
    // name: data ? data.profile.name : "",
    // postalCode: data ? data.profile.postalCode : "",
    // address: data ? data.profile.address : "",
    // city: data ? data.profile.city : "",
    // country: data ? data.profile.country : "",
    // openings: data ? data.profile.worktime : "",
    // storageSpace: data ? data.profile.storageSpace : 0,
    name: "",
    postalCode: "",
    address: "",
    city: "",
    country: "",
    openings: "",
    storageSpace: 0,
    geocode: {
      lat: 0,
      lng: 0,
    },
  });
  const [accessToken, setAccessToken] = useState<string>("");
  const [refreshToken, setRefreshToken] = useState<string>("");
  const [isTermsagree, setIsTermsagree] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalVerifyVisiable, setModalVerifyVisiable] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRegistered, setIsRegistered] = useState<boolean | undefined>(
    undefined,
  );

  useEffect(() => {
    setApplication({
      name: result ? result.profile.name : "",
      postalCode: result ? result.profile.postalCode : "",
      address: result ? result.profile.address : "",
      city: result ? result.profile.city : "",
      country: result ? result.profile.country : "",
      openings: result ? result.profile.worktime : "",
      storageSpace: result ? result.profile.storageSpace : 0,
      geocode: {
        lat: 0,
        lng: 0,
      },
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

  /* Show navigation header */
  useShowNavigationHeader({
    headerColor: ColorSchema.STORER_COLOR,
    isBackVisible: true,
    isTitleVisible: true,
    navigateToHome: ROUTES.HOME,
  });

  /** TAKE USER LOCATION */
  const { loading } = useGetLocation();

  /** GET PRIVATE KEY FROM SECURE STORE */
  const { privateKey } = useGetPrivateKey();

  /** CHECK IF USER IS REGISTERED */
  useCheckUserRegistered({ setIsRegistered });

  /** TAKE AUTH TOKENS FROM STORAGE */
  // useGetTokens({ setAccessToken, setRefreshToken });

  // const { accessToken } = useGetAccessToken();

  /** UPDATE ACCESS TOKEN ON REFRESH TOKEN */
  // useOnSuccessRefreshToken({ setAccessToken });

  /** FETCH STORER WALLET ADDRESS */
  const { publicAddress } = useGetStorerPublicAddress();

  /** LOGIN USER */
  // useLogin({ publicAddress, isRegistered: true, privateKey });

  /** SET ACCESS AND REFRESH TOKEN INTO EXPO STORAGE */
  // useSetTokens();

  useEffect(() => {
    setIsLoading(false);
    const checker = checkStorerApplication(application);
    if (success && checker) {
      (async () => {
        const signer = new Wallet(id(privateKey));
        const sig = await signer.signMessage(nonce.toString());
        dispatch(
          loginStorerUser({
            public_address: publicAddress,
            signature: sig,
          }),
        );
      })();

      setModalVisible(true);
    }
  }, [application, success]);

  useEffect(() => {
    const secureToStore = async (token: string) => {
      await setValueIntoSecureCode(StorageType.ACCESS_STORER_TOKEN, token);
    };
    if (status === "success") {
      secureToStore(access_token);
    }
  }, [access_token, status]);

  const handleChange = (key: string, value: string) => {
    const isError = value?.trim() === "" || value === undefined;
    setApplication((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSubmitApplication = async () => {
    setIsLoading(true);
    const checker = checkStorerApplication(application);
    if (checker && publicAddress) {
      const formData = new FormData();
      formData.append("public_address", publicAddress);
      formData.append("source", "recyclium");
      formData.append("name", application?.name);
      formData.append("address", application?.address);
      formData.append("lat", "100");
      formData.append("lng", "100");
      formData.append("postalCode", application?.postalCode);
      formData.append("city", application?.city);
      formData.append("country", application?.country);
      formData.append("worktime", application?.openings);
      formData.append("storageSpace", application?.storageSpace.toString());

      Promise.all([
        dispatch(
          createNewStorer({
            formData,
            accessToken,
          }),
        ),
        dispatch(getUserNonce({ public_address: publicAddress })),
      ]);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-03-green-mission">
      {isLoading ? <Spinner /> : null}
      <View className="flex flex-row justify-between h-12 items-center px-8">
        <BackButton />
        <HeaderTitle navigateToHome={ROUTES.HOME} bigIcon />
        <View className="w-6" />
      </View>
      <KeyboardAvoidingView
        className="flex-1 bg-03-green-mission mt-3"
        behavior={isIos ? "padding" : "height"}
        keyboardVerticalOffset={100}
      >
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          style={StyleSheet.absoluteFillObject}
        >
          <ScrollView
            className="flex-1 bg-03-green-mission p-0"
            scrollEnabled
            keyboardShouldPersistTaps="handled"
          >
            <View className="flex-1 bg-03-green-mission p-4 pt-1">
              <StorerInputFields
                application={application}
                handleChange={handleChange}
              />
            </View>
            <View className="flex flex-row mt-2 bg-[#101828]/[0.5] rounded-xl p-4 items-center m-4">
              <CheckboxOption
                value={isTermsagree}
                setValue={(val: boolean) => {
                  setIsTermsagree(val);
                }}
                color="border-[#101828]"
              />
              <Text
                style={{ fontFamily: "Nunito" }}
                className="flex-1 text-[16px] font-medium text-white leading-[22px] ml-4"
              >
                By checking this button, I have agreed with Recyclium’s Terms
                and Conditions
              </Text>
            </View>
            <View className="p-4 mb-4 bg-03-green-mission">
              <SubmitButton
                isTermsagree={isTermsagree}
                title="Submit Storer Application"
                handleSubmit={handleSubmitApplication}
              />
            </View>
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
          from="VerifyStorage"
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
          from="VerifyStorage"
        />
      </Modal>
    </SafeAreaView>
  );
};

export default memo(VerifyAndStorageScreen);
