import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { memo, FC, useState } from "react";
import Checkbox from "expo-checkbox";
import moment from "moment";
import Toast from "react-native-toast-message";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import AboutImageHeader from "../components/collectors/AboutImageHeader";
import AboutMissionContent from "../components/collectors/AboutMissionContent";
import AboutMissionCard from "../components/collectors/AboutMissionCard";
import CalendarIcon from "../components/icons/CalendarIcon";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import DollarSignIcon from "../components/icons/DollarSignIcon";
import AboutMissionButton from "../components/collectors/AboutMissionButton";
import { RootStackParamList, ROUTES } from "../navigation/NavigationTypes";
import { claimMission } from "../redux/missions/missionClaim/missionClaim.slice";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  ROUTES.COLLECT_MISSIONS_ABOUT
>;

const CollectorAboutScreen: FC = () => {
  const route = useRoute<RouteProp<{ params: { missionId: string } }>>();
  const { missionId } = route.params;

  const navigate = useNavigation<NavigationProp>();

  const [isChecked, setIsChecked] = useState(false);

  const { result } = useAppSelector((state) => state.missionQueryPublic);
  const { missions } = useAppSelector((state) => state.missionClaim);
  const dispatch = useAppDispatch();

  const handleClaimMission = () => {
    if (isChecked && missionId) {
      dispatch(
        claimMission({
          missionId,
          bountyId: result?.[0]?.id,
          bountyName: result?.[0]?.bounty_name,
          companyName: result?.[0]?.company_name,
          startDate: result?.[0]?.start_date,
          endDate: result?.[0]?.end_date,
        }),
      );
      navigate.navigate(ROUTES.COLLECT_MISSION_CLAIMED);
    } else {
      Toast.show({
        type: "error",
        text1: "You have to confirm Terms and Conditions",
      });
    }
  };

  const checker = missions.some((item) => item.missionId !== missionId);

  return (
    <SafeAreaView
      style={StyleSheet.absoluteFillObject}
      className="bg-02-purple-mission"
    >
      <ScrollView className="flex-1 p-0 bg-white rounded-t-[20px]">
        <AboutImageHeader />

        <AboutMissionContent />

        <View className="flex flex-row items-center justify-between p-4">
          <AboutMissionCard
            title={moment(result[0]?.end_date).format("MMMM YYYY")}
            iconLeft={
              <CalendarIcon
                style={{ width: 25, height: 24, color: "#425D7E" }}
              />
            }
          />
          <AboutMissionCard
            title="$0.6 per Item"
            iconLeft={
              <DollarSignIcon
                style={{ width: 25, height: 24, color: "#425D7E" }}
              />
            }
          />
        </View>

        <View className="flex flex-row items-center p-4">
          <View className="py-4 px-3 bg-02-purple-mission rounded-[20px]">
            <Text
              style={{ fontFamily: "Nunito" }}
              className="text-[12px] leading-[20px] font-medium text-[#FFFFFF]"
            >
              Cans
            </Text>
          </View>

          <View className="py-4 px-3 bg-02-purple-mission rounded-[20px] ml-3">
            <Text
              style={{ fontFamily: "Nunito" }}
              className="text-[12px] leading-[20px] font-medium text-[#FFFFFF]"
            >
              Coca-Cola
            </Text>
          </View>
        </View>

        {checker || missions.length === 0 ? (
          <View className="p-4 flex flex-row items-start">
            <Checkbox
              className="rounded-[10px]"
              value={isChecked}
              onValueChange={setIsChecked}
              color={isChecked ? "#2E6297" : "#2E6297"}
            />
            <Text
              style={{ fontFamily: "Nunito" }}
              className="text-[16px] leading-[20px] font-normal text-[#BBBBBB] ml-4"
            >
              By checking this button, I have agreed with Recyclium’s Terms and
              Conditions
            </Text>
          </View>
        ) : null}

        {checker || missions.length === 0 ? (
          <TouchableOpacity className="p-4" onPress={handleClaimMission}>
            <AboutMissionButton title="Claim Mission" />
          </TouchableOpacity>
        ) : null}

        <TouchableOpacity className="p-4" onPress={() => navigate.goBack()}>
          <AboutMissionButton title="Go Back" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default memo(CollectorAboutScreen);
