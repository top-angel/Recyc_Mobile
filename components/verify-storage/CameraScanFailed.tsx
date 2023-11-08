import { View, Text, TouchableOpacity } from "react-native";
import { memo, FC } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList, ROUTES } from "navigation/NavigationTypes";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  ROUTES.CAMERA
>;

type Props = {
  tryAgain: () => void;
};

const CameraScanFailed: FC<Props> = ({ tryAgain }) => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View className="flex h-[190px] w-full p-6 items-center bg-[#B00000] rounded-t-xl">
      <Text
        style={{ fontFamily: "Nunito" }}
        className="text-[22px] font-medium text-[#FFF]"
      >
        Item Already Collected
      </Text>
      <Text
        style={{ fontFamily: "Nunito" }}
        className="text-[22px] font-medium text-[#FFF]"
      >
        Try again with another bottle
      </Text>
      <TouchableOpacity
        className="flex w-full items-center bg-white p-3 mt-6 rounded-xl"
        onPress={tryAgain}
      >
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[18px] font-bold text-[#B00000]"
        >
          Try Again
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default memo(CameraScanFailed);
