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
import { useNavigation } from "@react-navigation/native";
import { Wallet } from "ethers";
import { id } from "ethers/lib/utils";
import BackButton from "components/header/BackButton";
import HeaderTitle from "components/header/HeaderTitle";
import ModalMissionCreateThanks from "components/collectors/ModalMissionCreateThanks";
import CreateCollectorInputFields from "components/collectors/CreateCollectorInputFields";
import RegisterCollectorButton from "components/collectors/RegisterCollectorButton";
import { createNewCollector } from "redux/collector/registrationCollector/registrationCollector.action";
import { useGetPrivateKey } from "hooks/collectors/useGetPrivateKey";
import { useCheckUserRegistered } from "hooks/collectors/useCheckUserRegistered";
import { useGetAccessToken } from "hooks/collectors/useGetAccessToken";
import { useSetTokens } from "hooks/collectors/useSetTokens";
import { useLogin } from "hooks/creators/useLogin";
import { loginUser } from "redux/auth/authLogin/authLogin.actions";
import { loginCollectorUser } from "redux/auth/authCollectorLogin/authCollectorLogin.actions";
import { setValueIntoSecureCode } from "lib/secureStore";
import { StorageType } from "enums/storageTypes";
import { useShowNavigationHeader } from "../hooks/useShowNavigationHeader";
import { ROUTES } from "../navigation/NavigationTypes";
import Title from "../components/global/Title";
import { wait } from "../lib/waitTimeout";
import { useGetTokens } from "../hooks/creators/useGetTokens";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { refreshAccessToken } from "../redux/auth/authRefreshToken/authRefreshToken.actions";
import { useOnSuccessRefreshToken } from "../hooks/creators/useOnSuccessRefreshToken";
import { CreatorDoc } from "../redux/creators/creators.types";
import Spinner from "../components/global/Spinner";
import { checkCollectorCreate } from "../lib/checkers";
import { ColorSchema } from "../enums/colorSchema";
import { useGetCollectorPublicAddress } from "../hooks/aggregates/useGetCollectorPublicAddress";
import { getUserNonce } from "../redux/auth/authGetNonce/authGetNonce.actions";

const CollectorRegistration: FC = () => {
  const { success, nonce } = useAppSelector(
    (state) => state.createCollectorNew,
  );
  const { status, access_token } = useAppSelector(
    (state) => state.authCollectorLogin,
  );

  const isIos = Platform.OS === "ios" || Platform.OS === "macos";

  const [refreshing, setRefreshing] = useState<boolean>(false);
  // const [accessToken, setAccessToken] = useState<string>("");
  const [refreshToken, setRefreshToken] = useState<string>("");
  const [bounty, setBounty] = useState<CollectorBounty>({
    firstName: "",
    lastName: "",
  });

  const [image, setImage] = useState<string>("");
  const [formDataFile, setFormDataFile] = useState<FormDataFile>();
  const [entityListId, setEntityListId] = useState<string>("");
  const [isTerms, setIsTerms] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const [isRegistered, setIsRegistered] = useState<boolean | undefined>(
    undefined,
  );
  const [privateKey, setPrivateKey] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const navigate = useNavigation();

  /* Show navigation header */
  useShowNavigationHeader({
    headerColor: ColorSchema.CREATOR_COLOR,
    isBackVisible: true,
    isTitleVisible: true,
    navigateToHome: ROUTES.HOME,
  });

  /** ON LOAD GET PRIVATE COLLECTOR KEY */
  const { loading } = useGetPrivateKey({ setPrivateKey });

  /** CHECK IF USER IS REGISTERED */
  useCheckUserRegistered({ setIsRegistered });

  /** TAKE AUTH TOKENS FROM STORAGE */
  // useGetTokens({ setAccessToken, setRefreshToken });

  /** UPDATE ACCESS TOKEN ON REFRESH TOKEN */
  // useOnSuccessRefreshToken({ setAccessToken });

  const { accessToken } = useGetAccessToken();

  /** FETCH COLLECTOR WALLET ADDRESS */
  const { publicAddress } = useGetCollectorPublicAddress();

  /** LOGIN USER */
  // useLogin({ publicAddress, isRegistered: true, privateKey });

  /** SET ACCESS AND REFRESH TOKEN INTO EXPO STORAGE */
  // useSetTokens();

  useEffect(() => {
    const checker = checkCollectorCreate({
      bounty,
      image,
    });
    if (success && checker) {
      setIsLoading(false);
      (async () => {
        const signer = new Wallet(id(privateKey));
        const sig = await signer.signMessage(nonce.toString());
        dispatch(
          loginCollectorUser({
            public_address: publicAddress,
            signature: sig,
          }),
        );
      })();

      navigate.navigate(ROUTES.COLLECT_MISSIONS);
    } else {
      setIsLoading(false);
    }
  }, [bounty, success]);

  useEffect(() => {
    const secureToStore = async (token: string) => {
      await setValueIntoSecureCode(StorageType.ACCESS_COLLECTOR_TOKEN, token);
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
    const checker = checkCollectorCreate({
      bounty,
      image,
    });

    if (checker) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("first_name", bounty.firstName);
      formData.append("last_name", bounty.lastName);
      formData.append("public_address", publicAddress);
      formData.append("source", "recyclium");
      formData.append("image", formDataFile as unknown as Blob);

      Promise.all([
        dispatch(
          createNewCollector({
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
    <SafeAreaView className="flex-1 bg-02-purple-mission">
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
            className="flex-1 bg-02-purple-mission mt-4"
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
              <Title title="Start as Collector" textColor="#FFFFFF" />

              <CreateCollectorInputFields
                bounty={bounty}
                handleChange={handleChange}
                image={image}
                setImage={setImage}
                accessToken={accessToken}
                setFormDataFile={setFormDataFile}
                setIsTerms={setIsTerms}
              />
            </View>
            <View className="p-4 mb-4 bg-02-purple-mission">
              <RegisterCollectorButton
                isTermsagree={isTerms}
                title="Start as Collector"
                handleSubmit={handleCreate}
              />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      {/* <Modal
        transparent
        animationType="slide"
        visible={modalVisible}
        statusBarTranslucent
        onRequestClose={() => setModalVisible(false)}
      >
        <ModalMissionCreateThanks
          setModalVisible={setModalVisible}
          from="Collector"
        />
      </Modal> */}
    </SafeAreaView>
  );
};

export default memo(CollectorRegistration);
