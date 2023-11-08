import { View, Text, TouchableOpacity, Alert, Linking } from "react-native";
import { FC, memo } from "react";
import moment from "moment";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MisssionClaimDoc } from "redux/missions/mission.types";
import { RootStackParamList, ROUTES } from "navigation/NavigationTypes";
import ImagePickerIcon from "../icons/ImagePickerIcon";

type Props = {
  mission: MisssionClaimDoc;
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  ROUTES.COLLECT_MISSIONS
>;

const MissionClaimedCard: FC<Props> = ({ mission }) => {
  const navigate = useNavigation<NavigationProp>();

  const percent = 0;
  // Calculate total difference between end and start date in seconds
  let diffInSeconds = moment(mission?.endDate).diff(
    moment(mission?.startDate),
    "seconds",
  );

  // Calucate days and subtract total seconds
  const days = Math.floor(diffInSeconds / 86400);
  diffInSeconds -= days * 86400;

  // Calculate total hours and subtract total seconds
  const hours = Math.floor(diffInSeconds / 3600) % 24;
  diffInSeconds -= hours * 3600;

  // Calculate total minutes
  const minutes = Math.round(Math.floor(diffInSeconds / 60) % 60);

  const handleUploadFile = async () => {
    // Get permission to use Image Galery to upload image
    const galleryStatus =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (galleryStatus.granted) {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
        aspect: [4, 3],
      });

      // If permission is granted get Image data to upload
      if (!result.canceled) {
        const { uri, type } = result.assets[0];

        const mime = uri.split(".").pop();

        const filename = uri.split("/").pop();

        const imageName = `${new Date().getTime()}.${filename}`;

        // Prepare data for FormData
        const file: FormDataFile = {
          uri: `${uri}`,
          name: imageName,
          type: `${type}/${mime}`,
        };

        navigate.navigate(ROUTES.COLLECT_UPLOAD_FILE, {
          data: {
            fileData: file,
            mission,
          },
        });
      }

      if (result.canceled) {
        // If user cancelled image upload show alert
        Alert.alert(
          "You did not select any image.",
          "Please, go back, and selet one",
          [
            {
              text: "Cancel",
            },
            {
              text: "OK",
            },
          ],
        );
      }
    }

    // If user not allowed gallery access show alert message
    if (!galleryStatus.granted) {
      Alert.alert(
        "Galler permission",
        "Please, enable Galery access to upload image",
        [
          {
            text: "Cancel",
          },
          {
            text: "OK",
            onPress: () => Linking.openSettings(),
          },
        ],
      );
    }
  };

  return (
    <View className="p-4 bg-[#FFFFFF] rounded-[12px] mb-6">
      <View className="flex flex-row items-center justify-between">
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[14px] leading-[20px] font-medium text-[#23262F]"
        >
          {mission?.bountyName}
        </Text>
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[12px] leading-[20px] font-medium text-[#23262F]"
        >
          Worldwide
        </Text>
      </View>

      <View className="mt-2 flex flex-row items-center justify-between">
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[12px] leading-[20px] font-normal text-[#777E91]"
        >
          {mission?.companyName}
        </Text>
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[12px] leading-[20px] font-normal text-[#777E91]"
        >
          Remaining
        </Text>
      </View>

      <View className="mt-2 flex flex-row items-center justify-between">
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[12px] leading-[20px] font-normal text-[#353945]"
        >
          0.5$ per Item
        </Text>
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[12px] leading-[20px] font-normal text-[#353945]"
        >
          {days > 0 ? `${days}d` : ""} {hours > 0 ? `${hours}h` : ""}{" "}
          {minutes > 0 ? `${minutes}m` : ""}
        </Text>
      </View>

      <View className="bg-[#E3EAEF] p-2 rounded-[9px] mt-2">
        <View className="w-full flex flex-row items-center my-2 rounded-[12px]">
          <View
            className="h-[5px] bg-[#2E6297] rounded-l-[15px]"
            style={{
              width: `${percent}%`,
            }}
          />
          <View
            className="h-[5px] bg-[#FFFFFF] rounded-r-[15px]"
            style={{
              width: `${100 - percent}%`,
            }}
          />
        </View>
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[16px] leading-[20px] font-normal text-[#353945] text-center"
        >
          0 Returns
        </Text>
      </View>

      <TouchableOpacity className="mt-2" onPress={handleUploadFile}>
        <View className="p-4 bg-02-purple-mission rounded-[12px] flex flex-row items-center justify-between">
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[18px] leading-[23px] font-bold text-[#FFFFFF] text-center"
          >
            Upload Image
          </Text>
          <ImagePickerIcon
            style={{
              width: 24,
              height: 24,
              color: "#FFFFFF",
            }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default memo(MissionClaimedCard);
