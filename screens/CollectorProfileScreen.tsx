import {
  View,
  Text,
  ScrollView,
  Modal,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { memo, FC, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-toast-message";
import { FontAwesome5 } from "@expo/vector-icons";
import BackButton from "components/header/BackButton";
import HeaderTitle from "components/header/HeaderTitle";
import IncidentsCard from "components/collectors/IncidentsCard";
import IncidentsIcon from "components/icons/IncidentsIcon";
import ModalReportStorer from "components/collectors/ModalReportStorer";
import { useShowNavigationHeader } from "../hooks/useShowNavigationHeader";
import { ROUTES } from "../navigation/NavigationTypes";
import Title from "../components/global/Title";
import ProfileCard from "../components/global/ProfileCard";
import BottleIcon from "../components/icons/BottleIcon";
import TruckIcon from "../components/icons/TruckIcon";
import HomeIcon from "../components/icons/HomeIcon";
import UsersIcon from "../components/icons/UsersIcon";
import { useGetPrivateKey } from "../hooks/collectors/useGetPrivateKey";
import { useCreateEthAccount } from "../hooks/creators/useCreateEthAccount";
import { ColorSchema } from "../enums/colorSchema";

const CollectorProfileScreen: FC = () => {
  const [privateKey, setPrivateKey] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  /* Show navigation header */
  useShowNavigationHeader({
    headerColor: ColorSchema.COLLECTOR_COLOR,
    isBackVisible: true,
    isTitleVisible: true,
    navigateToHome: ROUTES.HOME,
  });

  /** ON LOAD GET PRIVATE COLLECTOR KEY */
  useGetPrivateKey({ setPrivateKey });

  /** GET ETH WALLET WITH PRIVATE KEY */
  const { publicAddress } = useCreateEthAccount({ privateKey });

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(publicAddress);
    Toast.show({
      type: "success",
      text1: "Copy to clipboard",
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-02-purple-mission">
      <View className="flex flex-row justify-between h-12 items-center px-8">
        <BackButton />
        <HeaderTitle navigateToHome={ROUTES.HOME} bigIcon />
        <View className="w-6" />
      </View>
      <ScrollView className="flex-1 bg-02-purple-mission p-0 mt-3">
        <View className="flex-1 p-4">
          <View className="flex flex-row items-center justify-between -mt-2 py-2">
            <Title title="Profile" textColor="#FFFFFF" />
            <TouchableOpacity
              onPress={copyToClipboard}
              className="w-10 h-10 items-center justify-center rounded-full border-2 border-white"
            >
              {/* <View className="flex flex-row items-center">
                <Text
                  style={{ fontFamily: "Nunito" }}
                  className="text-[12px] leading-[160%] font-medium text-[#FFFFFF] mr-2"
                >
                  {publicAddress.substring(0, 13)}...
                  {publicAddress.substring(publicAddress.length - 7)}
                </Text>
                <CopyIcon
                  style={{
                    color: "#FFFFFF",
                    width: 16,
                    height: 16,
                  }}
                />
              </View> */}
              <FontAwesome5 name="user-alt" size={22} color="white" />
            </TouchableOpacity>
          </View>

          {/* Cards */}
          <View className="flex flex-row items-center justify-between mt-4">
            <ProfileCard
              icon={
                <BottleIcon
                  style={{
                    width: 10,
                    height: 24,
                    color: ColorSchema.TEXTINPUT_COLOR,
                  }}
                />
              }
              title="Stored Items"
              amount="0"
              footer="Items"
            />
            <ProfileCard
              icon={
                <TruckIcon
                  style={{
                    width: 24,
                    height: 24,
                    color: ColorSchema.TEXTINPUT_COLOR,
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
                    color: ColorSchema.TEXTINPUT_COLOR,
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
                    color: ColorSchema.TEXTINPUT_COLOR,
                  }}
                />
              }
              title="Storers"
              amount="0"
              footer="Storers"
            />
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

          <TouchableOpacity className="mt-6 border-2 border-white p-3 items-center rounded-xl" onPress={() => setModalVisible(true)}>
            <Text
              style={{ fontFamily: "Nunito" }}
              className="text-[18px] leading-[23px] font-bold text-white ml-2"
            >
              Report a Storer
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
        <ModalReportStorer setModalVisible={setModalVisible} />
      </Modal>
    </SafeAreaView>
  );
};

export default memo(CollectorProfileScreen);
