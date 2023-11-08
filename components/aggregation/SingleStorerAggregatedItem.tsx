import { View, Text, TouchableOpacity, Alert, Linking } from "react-native";
import { memo, FC } from "react";
import moment from "moment";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AggregatedItemDoc } from "redux/bounties/bountyAggregated.types";
import { RootStackParamList, ROUTES } from "navigation/NavigationTypes";
import { getBountyItemBySerNumber } from "redux/bounties/bountyGetBySerNumber/bountyGetBySerNumber.action";
import { useAppDispatch } from "redux/hooks";
import ImagePickerIcon from "../icons/ImagePickerIcon";

type Props = {
  item: AggregatedItemDoc;
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  ROUTES.VERIFY_AGGREGATED_CODES
>;

const SingleStorerAggregatedItem: FC<Props> = ({ item }) => {
  const navigate = useNavigation<NavigationProp>();

  const dispatch = useAppDispatch();

  const handleUploadImage = async () => {
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

        navigate.navigate(ROUTES.VERIFY_UPLOAD_IMAGE, {
          data: {
            fileData: file,
            totalItems: item.items.length,
            missionId: item.missionId,
          },
        });

        dispatch(getBountyItemBySerNumber({ serNumber: item?.items[0] }));
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
    <View className="p-4 bg-03-storer-light mb-4 rounded-[12px]">
      <Text
        style={{ fontFamily: "Nunito" }}
        className="text-[13px] leading-[36px] font-normal text-center text-03-storer-icon"
      >
        Link: {item?.hashedLink.substring(0, 20)}...
      </Text>

      <View className="flex flex-row items-center justify-between mt-4">
        <TouchableOpacity onPress={handleUploadImage}>
          <View className="flex flex-row items-center">
            <Text
              style={{ fontFamily: "Nunito" }}
              className="text-[14px] leading-[20px] font-semibold text-03-storer-icon mr-2"
            >
              Upload Image
            </Text>
            <ImagePickerIcon
              style={{ width: 28, height: 28, color: "#D3ECED" }}
            />
          </View>
        </TouchableOpacity>
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[12px] leading-[20px] font-normal text-03-storer-icon"
        >
          {moment(item?.createdAt).format("DD.MM.YYYY HH:mm")}
        </Text>
      </View>
    </View>
  );
};

export default memo(SingleStorerAggregatedItem);
