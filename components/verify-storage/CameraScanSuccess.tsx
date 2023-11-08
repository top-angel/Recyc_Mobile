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
  displayQRCode: () => void;
  serialNumber: string;
};

const CameraScanSuccess: FC<Props> = ({ displayQRCode, serialNumber }) => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View className="flex h-[300px] w-full p-6 bg-01-green rounded-t-xl">
      <Text
        style={{ fontFamily: "Nunito" }}
        className="text-[22px] font-bold text-[#FFF]"
      >
        Item Scanned!
      </Text>
      <Text
        style={{ fontFamily: "Nunito" }}
        className="text-[16px] font-medium text-[#FFF]"
      >
        Bring the item to Recyclium booth
      </Text>
      <View className="flex h-[108px] w-full bg-white p-4 mt-6 rounded-xl">
        <View className="flex flex-row items-center justify-between">
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[14px] font-medium text-black"
          >
            Water Bottles
          </Text>
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[12px] font-medium text-black"
          >
            Dubai Expo
          </Text>
        </View>
        <View className="flex flex-row h-[48px] items-center justify-between mt-2">
          <View className="flex ">
            <Text
              style={{ fontFamily: "Nunito" }}
              className="text-[12px] leading-[20px] font-normal text-[#777E90]"
            >
              Recyclium
            </Text>
            <Text
              style={{ fontFamily: "Nunito" }}
              className="text-[12px] leading-[20px] font-medium text-black mt-2"
            >
              2.0$ per Item
            </Text>
          </View>
          <View className="flex ">
            <Text
              style={{ fontFamily: "Nunito" }}
              className="text-[12px] leading-[20px] font-normal text-[#777E90]"
            >
              Remaining
            </Text>
            <Text
              style={{ fontFamily: "Nunito" }}
              className="text-[12px] leading-[20px] font-medium text-black"
            >
              20h : 37m
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        className="flex w-full items-center bg-white p-3 mt-6 rounded-xl"
        onPress={displayQRCode}
      >
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[18px] font-bold text-[#00B0AD]"
        >
          Display My QR Code
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default memo(CameraScanSuccess);
