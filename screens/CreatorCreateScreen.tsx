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
import BackButton from "components/header/BackButton";
import HeaderTitle from "components/header/HeaderTitle";
import ModalMissionCreateThanks from "components/collectors/ModalMissionCreateThanks";
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
import { useSetEntityListId } from "../hooks/creators/useSetEntityListId";
import { ColorSchema } from "../enums/colorSchema";

const CreatorCreateScreen: FC = () => {
  const { success } = useAppSelector((state) => state.creatorMissionNew);

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
  const [entityListId, setEntityListId] = useState<string>("");
  const [isTerms, setIsTerms] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  /* Show navigation header */
  useShowNavigationHeader({
    headerColor: ColorSchema.CREATOR_COLOR,
    isBackVisible: true,
    isTitleVisible: true,
    navigateToHome: ROUTES.HOME,
  });

  /** TAKE USER LOCATION */
  const { loading } = useGetLocation();

  /** TAKE AUTH TOKENS FROM STORAGE */
  useGetTokens({ setAccessToken, setRefreshToken });

  /** UPDATE ACCESS TOKEN ON REFRESH TOKEN */
  useOnSuccessRefreshToken({ setAccessToken });

  /** SET EntityListId ON SUCCESS UPLOAD IMAGE */
  useSetEntityListId({ setEntityListId });

  /** ON SUCCESS, REDIRECT USER TO MISSIONS CREATED SCREEN */
  // useRedirectToCreatedMissions();

  useEffect(() => {
    const checker = checkMissionCreate({
      bounty,
      itemsCount,
      image,
      startDate,
      endDate,
    });
    if (success && checker) {
      setModalVisible(true);
    }
  }, [bounty, endDate, image, itemsCount, startDate, success]);

  const handleChange = useCallback(
    (key: keyof CreatorDoc) => (text: string) => {
      setBounty({
        ...bounty,
        [key]: text,
      });
    },
    [bounty, setBounty],
  );

  const imageRequirements = {
    materialType: bounty.materialType,
    materialSize: bounty.materialSize,
    materialNumber: bounty.materialNumber,
  };

  const handleCreate = () => {
    const checker = checkMissionCreate({
      bounty,
      itemsCount,
      image,
      startDate,
      endDate,
    });
    if (entityListId && checker) {
      const formData = new FormData();
      formData.append("company_name", bounty.companyName);
      formData.append("email", bounty.email);
      formData.append("address", bounty.address);
      formData.append("country", bounty.country);
      formData.append("bounty_type", BountyType.UPLOAD);
      formData.append("company_image", formDataFile as unknown as Blob);
      formData.append("image_format", formDataFile?.type || "jpeg, jpg, png");

      if (accessToken) {
        dispatch(
          createNewMission({
            formData,
            accessToken,
          }),
        );
      }
    }
  };

  /** ON REFRESH LOAD DATA */
  const onRefresh = () => {
    setRefreshing(true);
    if (refreshToken) {
      dispatch(refreshAccessToken({ refresh_token: refreshToken }));
    }
    wait(300).then(() => setRefreshing(false));
  };

  return (
    <SafeAreaView className="flex-1 bg-01-creator-background-dark-color">
      {loading ? <Spinner /> : null}
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
                onRefresh={onRefresh}
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
        <ModalMissionCreateThanks setModalVisible={setModalVisible} from="Home"/>
      </Modal>
    </SafeAreaView>
  );
};

export default memo(CreatorCreateScreen);
