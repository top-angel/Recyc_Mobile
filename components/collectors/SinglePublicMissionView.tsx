import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { memo, FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList, ROUTES } from "navigation/NavigationTypes";
import TruckIcon from "../icons/TruckIcon";
import MissionStorageInfo from "./MissionStorageInfo";
import PublicMissionButton from "./PublicMissionButton";
import PublicMissionCard from "./PublicMissionCard";
import ImagePickerIcon from "../icons/ImagePickerIcon";
import CameraCollectorIcon from "../icons/CameraCollectorIcon";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  ROUTES.CREATE_MISSION_SINGLE
>;

const SinglePublicMissionView: FC = () => {
  const route = useRoute<RouteProp<{ params: { missionId: string } }>>();
  const { missionId } = route.params;

  const navigate = useNavigation<NavigationProp>();

  return (
    <View className="flex-1 bg-white rounded-t-[20px] z-20 p-4 -mt-7">
      {/* <View className="w-full items-center my-6">
        <TouchableOpacity
          onPress={() => navigate.navigate(ROUTES.COLLECT_QR_SCANNER)}
        >
          <CameraCollectorIcon />
        </TouchableOpacity>

        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[18px] leading-[23px] font-bold text-02-purple-mission mt-4"
        >
          Scan QR Code
        </Text>
      </View> */}

      <PublicMissionCard />

      <TouchableOpacity
        className="mt-4"
        onPress={() =>
          navigate.navigate(ROUTES.COLLECT_MISSIONS_ABOUT, { missionId })
        }
      >
        <PublicMissionButton
          title="Upload by image"
          rightIcon={
            <ImagePickerIcon
              style={{
                width: 24,
                height: 24,
                color: "#2E6297",
              }}
            />
          }
        />
      </TouchableOpacity>

      <MissionStorageInfo />

      <TouchableOpacity
        className="my-4"
        onPress={() =>
          navigate.navigate(ROUTES.COLLECT_TRACE_MISSION, { missionId })
        }
      >
        <PublicMissionButton
          title="Trace & Collect Rewards"
          rightIcon={
            <TruckIcon
              style={{
                width: 24,
                height: 24,
                color: "#2E6297",
              }}
            />
          }
        />
      </TouchableOpacity>

      <View className="h-[10px]" />
    </View>
  );
};

export default memo(SinglePublicMissionView);
