import { FC, memo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Checkbox from "expo-checkbox";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "redux/hooks";
import MinusIcon from "components/icons/MinusIcon";
import PlusIcon from "components/icons/PlusIcon";
import BottleIcon from "components/icons/BottleIcon";
import DollarSignIcon from "components/icons/DollarSignIcon";
import StoreBottleSuccessIcon from "components/icons/StoreBottleSuccessIcon";
import StorerBountyDetailsCard from "./StorerBountyDetailsCard";
import { ROUTES } from "navigation/NavigationTypes";

type Props = {
  totalReturns: number;
  fileData: FormDataFile;
  setLoading: (arg: boolean) => void;
  accessToken: string | undefined;
  setIsStored: (arg: boolean) => void;
  missionId: string;
};

const StorerBeforeUploadCard: FC<Props> = ({
  totalReturns,
  fileData,
  setLoading,
  accessToken,
  setIsStored,
  missionId,
}) => {
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const [itemAmount, setItemAmount] = useState<number>(totalReturns);
  const [itemStoredSuccess, setItemStoredSuccess] = useState<boolean>(false);

  const { geolocation } = useAppSelector((state) => state.globalSetGeolocation);
  const { bountyItem } = useAppSelector((state) => state.bountyGetBySerNumber);

  const navigate = useNavigation();

  const handleUploadFile = async () => {
    if (!confirmed) {
      Toast.show({
        type: "error",
        text1: "You have to verify conditions before upload",
      });
      return;
    }
    setItemStoredSuccess(true);
    if (geolocation && bountyItem && accessToken) {
      setLoading(true);

      const fileToUpload = new FormData();
      fileToUpload.append("file", fileData as unknown as Blob);
      fileToUpload.append("latitude", `${geolocation.lat}`);
      fileToUpload.append("longitude", `${geolocation.lng}`);
      fileToUpload.append("bounty", `${bountyItem?.bountyId}`);
      fileToUpload.append("mission_id", `${missionId}`);

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
          setIsStored(false);
        }

        // If there is an ID from the server response,
        // call Action to finish the upload
        if (response?.id) {
          Toast.show({
            type: "success",
            text1: "Successfully uploaded file!",
          });
          setLoading(false);
          setIsStored(true);
        }
      } catch (error) {
        Toast.show({
          type: "error",
          text1: error?.message,
        });
        setLoading(false);
        setIsStored(false);
      }
    }
  };

  const onClickMinus = () => {
    if (itemAmount > 1) {
      setItemAmount(itemAmount - 1);
    }
  };

  const onClickPlus = () => {
    setItemAmount(itemAmount + 1);
  };

  if (itemStoredSuccess) {
    return (
      <View className="flex p-4 bg-[#00B0AD] rounded-t-[12px] items-center">
        <StoreBottleSuccessIcon />
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[30px] font-bold text-white mr-4"
        >
          Items stored !
        </Text>
        <View className="flex flex-row justify-between w-full mt-6">
          <View className="flex flex-row w-[47%] bg-white items-center justify-center p-2 rounded-xl">
            <BottleIcon
              style={{
                width: 10,
                height: 24,
                color: "#1E5355",
              }}
            />
            <Text
              style={{ fontFamily: "Nunito" }}
              className="text-[14px] leading-[24px] font-medium text-[#1E5355] ml-3"
            >
              2 Item
            </Text>
          </View>
          <View className="flex flex-row w-[47%] bg-white items-center justify-center p-2 rounded-xl">
            <DollarSignIcon
              style={{ width: 24, height: 24, color: "#1C3C59" }}
            />
            <Text
              style={{ fontFamily: "Nunito" }}
              className="text-[14px] leading-[24px] font-medium text-[#1E5355] ml-3"
            >
              $1.2 per item
            </Text>
          </View>
        </View>
        <TouchableOpacity
          className="mt-6 w-full"
          onPress={() => {
            setItemStoredSuccess(false);
            navigate.navigate(ROUTES.VERIFY_AND_STORAGE_HOME);
          }}
        >
          <View className="bg-[#1E5455] p-4 rounded-[14px]">
            <Text
              style={{ fontFamily: "Nunito" }}
              className="text-[22px] leading-[24px] font-bold text-[#FFFFFF] text-center"
            >
              Go Back
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView className="flex p-4 bg-[#00B0AD] rounded-t-[12px]">
      <StorerBountyDetailsCard totalReturns={totalReturns} />

      <View className="flex mt-3">
        <View className="flex flex-row items-center justify-between mt-1">
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[14px] leading-[24px] font-medium text-white mr-4"
          >
            Product Name
          </Text>
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[14px] leading-[24px] font-medium text-[#1E5355] mr-4"
          >
            330ml Cans
          </Text>
        </View>
        <View className="flex flex-row items-center justify-between mt-1">
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[14px] leading-[24px] font-medium text-white mr-4"
          >
            Material type
          </Text>
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[14px] leading-[24px] font-medium text-[#1E5355] mr-4"
          >
            Tin
          </Text>
        </View>
        <View className="flex flex-row items-center justify-between mt-1">
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[14px] leading-[24px] font-medium text-white mr-4"
          >
            Material Size
          </Text>
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[14px] leading-[24px] font-medium text-[#1E5355] mr-4"
          >
            330ml
          </Text>
        </View>
      </View>

      <View className="flex flex-row items-center justify-between mt-6 p-3 bg-[#1E53554D] rounded-[12px]">
        <Text
          style={{ fontFamily: "Nunito" }}
          className="flex-1 text-[16px] leading-[20px] font-medium text-white mr-4"
        >
          I have verified the condition & amount of the items.
        </Text>
        <Checkbox
          className="rounded-[10px]"
          color="#fff"
          value={confirmed}
          onValueChange={(value) => setConfirmed(value)}
        />
      </View>

      <View className="mt-6">
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[16px] leading-[24px] font-medium text-[#FFFFFF] mb-2"
        >
          Item Amount
        </Text>
        <View className="flex flex-row items-center  justify-between">
          <TouchableOpacity
            className="flex p-3 rounded-[14px] bg-[#1E5355]"
            onPress={onClickMinus}
          >
            <MinusIcon />
          </TouchableOpacity>
          <TextInput
            style={{ fontFamily: "Nunito", width: "100%" }}
            placeholder="Storage space"
            keyboardType="decimal-pad"
            value={itemAmount > 0 ? itemAmount.toString() : ""}
            placeholderTextColor="#1E5455"
            onChangeText={(text) => setItemAmount(parseFloat(text))}
            editable={false}
            className="flex-1 bg-[#80D8D6] p-2 rounded-[12px] text-[14px] leading-[20px] mx-4 text-white pl-4 font-medium"
          />
          <TouchableOpacity
            className="flex p-[14px] rounded-[14px] bg-[#1E5355]"
            onPress={onClickPlus}
          >
            <PlusIcon />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity className="my-4" onPress={handleUploadFile}>
        <View className="bg-[#1E5455] p-4 rounded-[14px] mb-2">
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[22px] leading-[24px] font-bold text-[#FFFFFF] text-center"
          >
            Store Bottles
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default memo(StorerBeforeUploadCard);
