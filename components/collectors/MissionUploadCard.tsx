import { View, Text, TouchableOpacity } from "react-native";
import { FC, memo, useState } from "react";
import moment from "moment";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { useAppSelector } from "redux/hooks";
import { RootStackParamList, ROUTES } from "navigation/NavigationTypes";

type Props = {
  mission: MisssionClaim;
  fileData: FormDataFile;
  accessToken: string;
  setLoading: (arg: boolean) => void;
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  ROUTES.COLLECT_UPLOAD_FILE
>;

const MissionUploadCard: FC<Props> = ({
  mission,
  fileData,
  accessToken,
  setLoading,
}) => {
  const navigate = useNavigation<NavigationProp>();

  const [uploaded, setUploaded] = useState(false);
  const [returned, setReturned] = useState<number>(0);

  const { geolocation } = useAppSelector((state) => state.globalSetGeolocation);

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
    if (geolocation) {
      setLoading(true);

      const fileToUpload = new FormData();
      fileToUpload.append("file", fileData as unknown as Blob);
      fileToUpload.append("latitude", `${geolocation.lat}`);
      fileToUpload.append("longitude", `${geolocation.lng}`);
      // fileToUpload.append("bounty", `${mission?.bountyName}`);
      fileToUpload.append("bounty", `${mission?.bountyId}`);
      fileToUpload.append("mission_id", `${mission?.missionId}`);

      const config = {
        method: "post",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
        body: fileToUpload,
      };

      try {
        const res = await fetch(
          "https://crab.recyclium.dataunion.app/api/v1/upload-file",
          config,
        );
        const response = await res.json();

        if (response?.messages) {
          Toast.show({
            type: "error",
            text1: response?.messages,
          });
          setLoading(false);
          setUploaded(false);
        }

        // If there is an ID from the server response,
        // call Action to finish the upload
        if (response?.id) {
          Toast.show({
            type: "success",
            text1: "Successfully uploaded file!",
          });
          setLoading(false);
          setUploaded(true);
          setReturned(returned + 1);
        }
      } catch (error) {
        Toast.show({
          type: "error",
          text1: error?.message,
        });
        setLoading(false);
        setUploaded(false);
      }
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
          {returned} Returns
        </Text>
      </View>

      {!uploaded ? (
        <TouchableOpacity className="mt-2" onPress={handleUploadFile}>
          <View className="p-4 bg-02-purple-mission rounded-[12px]">
            <Text
              style={{ fontFamily: "Nunito" }}
              className="text-[18px] leading-[23px] font-bold text-[#FFFFFF] text-center"
            >
              Upload image
            </Text>
          </View>
        </TouchableOpacity>
      ) : null}

      {uploaded ? (
        <View className="my-2">
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[18px] leading-[23px] font-bold text-[#9EE1AD] text-center"
          >
            Upload Successful!
          </Text>
        </View>
      ) : null}

      {uploaded ? (
        <TouchableOpacity
          className="mt-2"
          onPress={() => navigate.navigate(ROUTES.COLLECT_MISSIONS)}
        >
          <View className="p-4 border border-[#2E6297] rounded-[12px]">
            <Text
              style={{ fontFamily: "Nunito" }}
              className="text-[18px] leading-[23px] font-bold text-[#2E6297] text-center"
            >
              Go to Mission Page
            </Text>
          </View>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default memo(MissionUploadCard);
