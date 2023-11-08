import { View, Text, TouchableOpacity } from "react-native";
import { memo, FC } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList, ROUTES } from "navigation/NavigationTypes";
import PhotoClickIcon from "components/icons/PhotoClickIcon";
import ToggleCameraIcon from "components/icons/ToggleCameraIcon1";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  ROUTES.CAMERA
>;

type Props = {
  takePhoto: () => void;
  toggleCameraType: () => void;
};

const CameraFooter: FC<Props> = ({ takePhoto, toggleCameraType }) => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View className="flex h-[150px] w-full items-center justify-center bg-black ">
      <Text
        style={{ fontFamily: "Nunito" }}
        className="text-[13px] text-[#FFF] mb-3"
      >
        PHOTO
      </Text>
      <View className="flex flex-row w-full items-center">
        <TouchableOpacity
          className="flex w-1/3 items-center"
          onPress={() => navigation.goBack()}
        >
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[18px] text-[#FFF]"
          >
            Back
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex w-1/3 items-center"
          onPress={takePhoto}
        >
          <PhotoClickIcon />
        </TouchableOpacity>
        <TouchableOpacity
          className="flex w-1/3 items-center"
          onPress={toggleCameraType}
        >
          <ToggleCameraIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(CameraFooter);
