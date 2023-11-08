import { View, Text, TouchableOpacity } from "react-native";
import { memo, FC } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList, ROUTES } from "navigation/NavigationTypes";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  ROUTES.CREATE_MISSION_CREATE
>;

type Props = {
  handleCreate: () => void;
  isTerms: boolean;
};

const CreateMissionButtons: FC<Props> = ({ handleCreate, isTerms }) => {
  const navigate = useNavigation<NavigationProp>();

  return (
    <View className="p-4 flex flex-row items-center justify-between my-2">
      <TouchableOpacity
        className="w-full"
        onPress={handleCreate}
        disabled={!isTerms}
      >
        <View
          className={`rounded-[14px] bg-03-green-mission p-4 ${
            isTerms ? "opacity-100" : "opacity-50"
          }`}
        >
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[#FFFFFF] text-[22px] leading-[24px] font-bold text-center"
          >
            Submit Creator Application
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default memo(CreateMissionButtons);
