import { View, Text, TouchableOpacity } from "react-native";
import { memo, FC } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList, ROUTES } from "navigation/NavigationTypes";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  ROUTES.CREATE_MISSION_CREATE
>;

type Props = {
  setModalVisible: (arg: boolean) => void;
};

const MissionUpdateButtons: FC<Props> = ({ setModalVisible }) => {
  const navigate = useNavigation<NavigationProp>();

  return (
    <View className="p-4 bg-[#FFFFFF] flex flex-row items-center justify-between">
      <TouchableOpacity className="w-[30%]" onPress={() => navigate.goBack()}>
        <View className="border border-[#96B4DA] rounded-[14px] p-4">
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[20px] leading-[22px] text-01-creator-dark font-semibold text-center"
          >
            Back
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        className="w-[68%]"
        onPress={() => setModalVisible(true)}
      >
        <View className="rounded-[14px] bg-01-creator-dark p-4">
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[#FFFFFF] text-[24px] leading-[24px] font-bold text-center"
          >
            End Mission
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default memo(MissionUpdateButtons);
