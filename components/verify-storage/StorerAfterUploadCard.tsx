import { View, Text, TouchableOpacity } from "react-native";
import { FC, memo } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList, ROUTES } from "navigation/NavigationTypes";
import SuccessGreenIcon from "../icons/SuccessGreenIcon";
import BottleIcon from "../icons/BottleIcon";
import DollarSignIcon from "../icons/DollarSignIcon";

type Props = {
  totalReturns: number;
  setIsStored: (arg: boolean) => void;
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  ROUTES.VERIFY_UPLOAD_IMAGE
>;

const StorerAfterUploadCard: FC<Props> = ({ totalReturns, setIsStored }) => {
  const navigate = useNavigation<NavigationProp>();

  const handleRedirect = () => {
    navigate.navigate(ROUTES.VERIFY_AND_STORAGE_HOME);
    setIsStored(false);
  };

  return (
    <View>
      <View className="flex justify-center items-center">
        <SuccessGreenIcon />
      </View>

      <Text
        style={{ fontFamily: "Nunito" }}
        className="text-[32px] leading-[44px] font-bold text-[#1E5355] text-center"
      >
        Items Restored!
      </Text>

      <View className="flex flex-row items-center justify-between my-6">
        <View className="p-3 bg-[#D9EDEC] rounded-[6px] flex flex-row items-center justify-center w-[47%]">
          <BottleIcon style={{ width: 10, height: 24, color: "#1E5355" }} />
          <Text>{totalReturns} items</Text>
        </View>

        <View className="p-3 bg-[#D9EDEC] rounded-[6px] flex flex-row items-center justify-center w-[47%]">
          <DollarSignIcon style={{ width: 24, height: 24, color: "#1E5355" }} />
          <Text>1.2$ per item</Text>
        </View>
      </View>

      <TouchableOpacity className="mb-6" onPress={handleRedirect}>
        <View className="bg-[#1E5455] p-4 rounded-[14px]">
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[24px] leading-[24px] font-bold text-[#FFFFFF] text-center"
          >
            Go Back
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default memo(StorerAfterUploadCard);
