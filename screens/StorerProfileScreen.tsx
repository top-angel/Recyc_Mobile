import { FC, memo, useState } from "react";
import {
  ScrollView,
  View,
  Modal,
  TouchableOpacity,
  Text,
  Platform,
  TextInput,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "components/header/BackButton";
import HeaderTitle from "components/header/HeaderTitle";
import IncidentsCard from "components/collectors/IncidentsCard";
import IncidentsIcon from "components/icons/IncidentsIcon";
import Subtitle from "components/global/Subtitle";
import ModalReportCollector from "components/collectors/ModalReportCollector";
import ProfileCard from "../components/global/ProfileCard";
import Title from "../components/global/Title";
import BottleIcon from "../components/icons/BottleIcon";
import CopyIcon from "../components/icons/CopyIcon";
import HomeIcon from "../components/icons/HomeIcon";
import TruckIcon from "../components/icons/TruckIcon";
import UsersIcon from "../components/icons/UsersIcon";
import StorerRatingCard from "../components/verify-storage/StorerRatingCard";
import { ColorSchema } from "../enums/colorSchema";
import { useShowNavigationHeader } from "../hooks/useShowNavigationHeader";
import { ROUTES } from "../navigation/NavigationTypes";
import { useAppSelector } from "../redux/hooks";
import { useGetStorerPublicAddress } from "../hooks/storer/useGetStorerPublicAddress";
import { useFetchAggregatedItemsOnLoad } from "../hooks/storer/useFetchAggregatedItemsOnLoad";
import Spinner from "../components/global/Spinner";

const StorerProfileScreen: FC = () => {
  const [page] = useState<number>(0);
  const [perPage] = useState<number>(10);

  const storerProfileInfo = useAppSelector((state) => state.storerGetProfile);
  const { total } = useAppSelector((state) => state.bountyGetStorerItems);

  const [description, setDescription] = useState<string>(
    storerProfileInfo.result.profile.worktime,
  );
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  /* Show navigation header */
  useShowNavigationHeader({
    headerColor: ColorSchema.STORER_COLOR,
    isBackVisible: true,
    isTitleVisible: true,
    navigateToHome: ROUTES.HOME,
  });

  /** FETCH WALLET ADDRESS */
  const { publicAddress } = useGetStorerPublicAddress();

  /** FETCH AGGREGATED ITEMS ON LOAD */
  const { loading } = useFetchAggregatedItemsOnLoad({
    page,
    perPage,
    publicAddress,
  });

  // const handleCopy = async () => {
  //   if (storer) {
  //     await Clipboard.setStringAsync(storer.walletAddress);
  //     Toast.show({
  //       type: "success",
  //       text1: "Copied to clipboard!",
  //     });
  //   }
  // };

  return (
    <SafeAreaView className="flex-1 bg-03-green-mission">
      {loading ? <Spinner /> : null}
      <View className="flex flex-row justify-between h-12 items-center px-8">
        <BackButton />
        <HeaderTitle navigateToHome={ROUTES.HOME} bigIcon />
        <View className="w-6" />
      </View>
      <ScrollView className="bg-03-green-mission flex-1 p-0 mt-3">
        <View className="flex-1 p-4">
          <View className="flex flex-row items-center justify-between -mt-3">
            <Title title="Profile" textColor="#FFFFFF" />
            {/* {storer ? (
              <TouchableOpacity onPress={handleCopy}>
                <View className="flex flex-row items-center">
                  <Text
                    style={{ fontFamily: "Nunito" }}
                    className="text-[12px] leading-[160%] font-medium text-[#FFFFFF] mr-2"
                  >
                    {storer.walletAddress.substring(0, 13)}...
                    {storer.walletAddress.substring(
                      storer.walletAddress.length - 7,
                    )}
                  </Text>
                  <CopyIcon
                    style={{
                      color: "#FFFFFF",
                      width: 16,
                      height: 16,
                    }}
                  />
                </View>
              </TouchableOpacity>
            ) : null} */}
          </View>

          {/* Cards */}
          <View className="flex flex-row items-center justify-between mt-6">
            <ProfileCard
              icon={
                <BottleIcon
                  style={{
                    width: 10,
                    height: 24,
                    color: ColorSchema.STORER_COLOR_ICON,
                  }}
                />
              }
              title="Stored Items"
              amount={total.toString()}
              footer="Items"
            />
            <ProfileCard
              icon={
                <TruckIcon
                  style={{
                    width: 24,
                    height: 24,
                    color: ColorSchema.STORER_COLOR_ICON,
                  }}
                />
              }
              title="Missions"
              amount="0"
              footer="Missions"
            />
          </View>

          <View className="flex flex-row items-center justify-between mt-4">
            <ProfileCard
              icon={
                <HomeIcon
                  style={{
                    width: 24,
                    height: 24,
                    color: ColorSchema.STORER_COLOR_ICON,
                  }}
                />
              }
              title="Companies"
              amount="0"
              footer="Companies"
            />
            <ProfileCard
              icon={
                <UsersIcon
                  style={{
                    width: 24,
                    height: 24,
                    color: ColorSchema.STORER_COLOR_ICON,
                  }}
                />
              }
              title="Collectors"
              amount="0"
              footer="Collectors"
            />
          </View>

          <View className="flex flex-row items-center justify-between mt-4">
            <StorerRatingCard />
          </View>

          <View className="mt-4">
            <IncidentsCard
              icon={
                <IncidentsIcon
                  style={{
                    width: 24,
                    height: 24,
                    color: ColorSchema.TEXTINPUT_COLOR,
                  }}
                />
              }
              iconFooter={
                <Text
                  style={{ fontFamily: "Nunito" }}
                  className="text-[14px] leading-[20px] font-bold text-[#1E5355] ml-2"
                >
                  No Incidents
                </Text>
              }
              title="Impact rating"
            />
          </View>
          <View className="mt-8">
            <Subtitle title="Opening Hours & Description" textColor="#FFFFFF" />
            <View className="mt-2 mb-6">
              <TextInput
                style={{
                  fontFamily: "Nunito",
                  width: "100%",
                  height: 110,
                  textAlignVertical: "top",
                }}
                placeholder="Type here"
                multiline
                numberOfLines={Platform.OS === "ios" ? null : 4}
                keyboardType="default"
                blurOnSubmit={false}
                value={description}
                placeholderTextColor={ColorSchema.PLACEHOLDER_COLOR}
                onChangeText={(input: string) => {
                  setDescription(input);
                }}
                className="p-4 bg-white rounded-[12px] text-[14px] leading-[20px] text-[#1E5455] font-medium"
              />
            </View>
          </View>
          <TouchableOpacity>
            <View className={`rounded-[14px] bg-[#1E5355] p-4 `}>
              <Text
                style={{ fontFamily: "Nunito" }}
                className="text-[#FFFFFF] text-[18px] leading-[24px] font-bold text-center"
              >
                Save Changes
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className="mt-6 border-2 border-white p-3 items-center rounded-xl"
            onPress={() => setModalVisible(true)}
          >
            <Text
              style={{ fontFamily: "Nunito" }}
              className="text-[18px] leading-[23px] font-bold text-white ml-2"
            >
              Report a Collector
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal
        transparent
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        statusBarTranslucent
      >
        <ModalReportCollector setModalVisible={setModalVisible} />
      </Modal>
    </SafeAreaView>
  );
};

export default memo(StorerProfileScreen);
