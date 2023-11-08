import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { memo, FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList, ROUTES } from "navigation/NavigationTypes";
import AddMissionIcon from "components/icons/AddMissionIcon";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  ROUTES.CREATE_MISSION
>;

const CreatorHomeBanner: FC = () => {
  const navigate = useNavigation<NavigationProp>();

  return (
    <TouchableOpacity
      className="flex flex-row"
      onPress={() => navigate.navigate(ROUTES.CREATE_MISSION_CREATE)}
    >
      <View className="flex flex-row px-4 py-[6px] bg-[#101828]/[0.5] rounded-[12px] items-center">
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[12px] font-bold leading-[23px] text-[#FFFFFF] mr-3"
        >
          Apply for Mission Creation
        </Text>
          <AddMissionIcon />
      </View>
    </TouchableOpacity>
  );
};

export default memo(CreatorHomeBanner);
