import { View, Text, TouchableOpacity } from "react-native";
import { memo, FC } from "react";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "navigation/NavigationTypes";

type Props = {
  from: string;
  setModalVisible: (arg: boolean) => void;
};

const ModalMissionCreateThanks: FC<Props> = ({ from, setModalVisible }) => {
  const navigate = useNavigation();
  return (
    <View className="flex-1 justify-end bg-[#101828]/[0.5]">
      <View
        className="bg-white rounded-t-[12px] p-5"
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <View className="flex flex-col items-center justify-center mb-4">
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[22px] leading-[36px] font-bold text-[#1E5355]"
          >
            Thank you for your application
          </Text>
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[16px] leading-[36px] font-medium text-[#1E5355]"
          >
            Your application will be processed soon
          </Text>
        </View>

        <View className="flex flex-col items-center justify-center mb-6">
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[14px] font-medium text-[#1E5355] text-center"
          >
            Your can safely close the app. We will send you a notification when
            your application is processed
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            setModalVisible(false);
            from === "Home"
              ? navigate.navigate(ROUTES.CREATE_MISSION)
              : from === "Collector"
              ? navigate.navigate(ROUTES.COLLECT_MISSIONS)
              : navigate.navigate(ROUTES.CREATE_MISSION);
          }}
        >
          <View className="bg-white rounded-[14px] p-4 my-1 border-2 border-[#00B0AD]">
            <Text
              style={{ fontFamily: "Nunito" }}
              className="text-[18px] leading-[20px] font-bold text-[#00B0AD] text-center"
            >
              Edit Details
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(ModalMissionCreateThanks);
