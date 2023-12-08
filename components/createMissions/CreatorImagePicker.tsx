import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  Linking,
} from "react-native";
import { FC, memo, useState } from "react";
import Toast from "react-native-toast-message";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { uploadMisssionImage } from "redux/creators/creatorUploadImage/creatorUploadImage.actions";
import { axiosServer } from "services/axios";
import ImagePickerIcon from "../icons/ImagePickerIcon";
import Spinner from "../global/Spinner";

type Props = {
  image: string;
  setImage: (arg: string) => void;
  accessToken: string;
  setFormDataFile: (arg: FormDataFile) => void;
  bgColor: undefined;
};

const CreatorImagePicker: FC<Props> = ({
  image,
  setImage,
  accessToken,
  setFormDataFile,
  bgColor,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageName, setImageName] = useState<string>("");

  const { geolocation } = useAppSelector((state) => state.globalSetGeolocation);
  const dispatch = useAppDispatch();

  const pickImageAsync = async () => {
    setIsLoading(true);

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
        setIsLoading(false);
        const { uri, type } = result.assets[0];
        setImage(uri);

        const mime = uri.split(".").pop();

        const filename = uri.split("/").pop();
        setImageName(filename);
        // Generate Image in Base64 format
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: "base64",
        });

        const imageName1 = `${new Date().getTime()}.${filename}`;

        // Prepare data for FormData
        const file: FormDataFile = {
          uri: `${uri}`,
          name: imageName1,
          type: `${type}/${mime}`,
        };

        setFormDataFile(file);
        // const fileData = new FormData();
        // fileData.append("file", file as unknown as Blob);
        // // fileData.append("latitude", `${geolocation.lat}`);
        // // fileData.append("longitude", `${geolocation.lng}`);

        // const config = {
        //   method: "post",
        //   headers: {
        //     Authorization: `Bearer ${accessToken}`,
        //     Accept: "application/json",
        //     "Content-Type": "multipart/form-data",
        //   },
        //   body: fileData,
        // };

        // try {
        //   const res = await fetch(
        //     "https://crab.recyclium.dataunion.app/api/v1/upload-file",
        //     config,
        //   );

        //   const response = await res.json();
        //   if (response?.messages) {
        //     Toast.show({
        //       type: "error",
        //       text1: response?.messages,
        //     });
        //     setIsLoading(false);
        //   }

        //   // If there is an ID from the server response,
        //   // call Action to finish the upload
        //   if (response?.id) {
        //     dispatch(
        //       uploadMisssionImage({
        //         accessToken,
        //         baseImage: base64,
        //         entityIds: [response?.id],
        //         name: imageName,
        //       }),
        //     );
        //     setIsLoading(false);
        //   }
        // } catch (error) {
        //   Toast.show({
        //     type: "error",
        //     text1: error?.message,
        //   });
        //   setIsLoading(false);
        // }
      }

      // if (result.canceled) {
      //   // If user cancelled image upload show alert
      //   Alert.alert(
      //     "You did not select any image.",
      //     "Please, go back, and select one",
      //     [
      //       {
      //         text: "Cancel",
      //       },
      //       {
      //         text: "OK",
      //       },
      //     ],
      //   );
      // }
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
    <View
      className={`flex h-[102px] bg-[${bgColor}] border-2 border-dashed border-[#fff] justify-center items-center`}
    >
      {isLoading ? <Spinner /> : null}
      {image ? (
        <Image
          source={{ uri: image }}
          className="absolute top-0 left-0 right-0 bottom-0"
        />
      ) : null}

      {!image ? (
        <TouchableOpacity
          className="flex items-center w-full"
          onPress={pickImageAsync}
        >
          <View className="p-2 rounded-[8px]">
            <ImagePickerIcon
              style={{ width: 28, height: 28, color: "#D3ECED" }}
            />
          </View>
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[16px] font-bold text-white leading-[20px]"
          >
            Click to upload
          </Text>
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[12px] font-medium text-white leading-[18px]"
          >
            SVG, PNG, JPG (max. 800x800px)
          </Text>
        </TouchableOpacity>
      ): (
        <View className="flex bg-[#000]/[0.5] p-2 rounded-lg absolute left-2 bottom-2">
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[12px] font-medium text-white leading-[18px]"
          >
            {imageName}
          </Text>
        </View>
      )}
    </View>
  );
};

export default memo(CreatorImagePicker);
