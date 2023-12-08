import { View, Text, TouchableOpacity } from "react-native";
import { memo, FC } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList, ROUTES } from "navigation/NavigationTypes";

type Props = {
  from: string;
  setModalVerifyVisiable: (arg: boolean) => void;
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  ROUTES.VERIFY_AND_STORAGE_HOME
>;

const ModalApplicationVerified: FC<Props> = ({
  from,
  setModalVerifyVisiable,
}) => {
  const navigate = useNavigation<NavigationProp>();
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
            Application Verified !
          </Text>
        </View>

        <View className="flex flex-col items-center justify-center mb-6">
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[14px] font-medium text-[#1E5355] text-center"
          >
            {from === "Creator"
              ? "You are officially a Recyclium Mission Creator !"
              : "You are officially a Recyclium Storer !"}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            setModalVerifyVisiable(false);
            navigate.navigate(from === "Creator" ? ROUTES.CREATE_MISSION : ROUTES.VERIFY_AND_STORAGE_HOME);
          }}
        >
          <View className="rounded-[14px] p-4 my-1 bg-[#00B0AD]">
            <Text
              style={{ fontFamily: "Nunito" }}
              className="text-[18px] leading-[20px] font-normal text-white text-center"
            >
              Start Exploring
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(ModalApplicationVerified);
