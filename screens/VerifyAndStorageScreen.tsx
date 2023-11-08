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
import { memo, FC, useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "components/header/BackButton";
import HeaderTitle from "components/header/HeaderTitle";
import CheckboxOption from "components/global/CheckboxOption";
import ModalMissionCreateThanks from "components/collectors/ModalMissionCreateThanks";
import { useShowNavigationHeader } from "../hooks/useShowNavigationHeader";
import { ROUTES } from "../navigation/NavigationTypes";
import StorerInputFields from "../components/verify-storage/StorerInputFields";
import ModalSearchPlaces from "../components/verify-storage/ModalSearchPlaces";
import SubmitButton from "../components/verify-storage/SubmitButton";
import { useAppDispatch } from "../redux/hooks";
import { StorersDoc } from "../redux/storers/storers.types";
import { ColorSchema } from "../enums/colorSchema";
import { useGetPrivateKey } from "../hooks/storer/useGetPrivateKey";
import { useCreateEthAccount } from "../hooks/creators/useCreateEthAccount";
import { createNewStorer } from "../redux/storers/storerCreateNew/storerCreateNew.action";
import { useRedirectOnSuccessCreate } from "../hooks/storer/useRedirectOnSuccessCreate";
import Spinner from "../components/global/Spinner";

const VerifyAndStorageScreen: FC = () => {
  const isIos = Platform.OS === "ios" || Platform.OS === "macos";

  const [application, setApplication] = useState<StorerApplication>({
    name: "",
    postalCode: "",
    street: "",
    city: "",
    country: "",
    openings: "",
    storageSpace: 0,
    geocode: {
      lat: 0,
      lng: 0,
    },
  });
  const [isTermsagree, setIsTermsagree] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

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

  /** REDIRECT USER ON SUCCESS CREATE PROFILE */
  const { loading } = useRedirectOnSuccessCreate();

  // const handleChange = useCallback(
  //   (key: keyof StorersDoc) => (text: string) => {
  //     setApplication({
  //       ...application,
  //       [key]: text,
  //     });
  //   },
  //   [application, setApplication],
  // );

  const handleChange = (key: string, value: string) => {
    const isError = value?.trim() === "" || value === undefined;
    setApplication((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSubmitApplication = () => {
    // if (publicAddress) {
      // dispatch(
      //   createNewStorer({
      //     walletAddress: publicAddress,
      //     name: application?.name,
      //     address: application?.street,
      //     geocode: application?.geocode,
      //     postalCode: application?.postalCode,
      //     city: application?.city,
      //     country: application?.country,
      //     worktime: application?.openings,
      //     storageSpace: application?.storageSpace,
      //   }),
      // );
      setModalVisible(true);
    // }
  };

  return (
    <SafeAreaView className="flex-1 bg-03-green-mission">
      {loading ? <Spinner /> : null}
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
        <ModalMissionCreateThanks setModalVisible={setModalVisible} from="VerifyStorage"/>
      </Modal>
    </SafeAreaView>
  );
};

export default memo(VerifyAndStorageScreen);
