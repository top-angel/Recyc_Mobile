import {
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { FC, memo, useRef, useState } from "react";
import {
  GooglePlaceData,
  GooglePlaceDetail,
} from "react-native-google-places-autocomplete";
import { StorersDoc } from "redux/storers/storers.types";
import { ColorSchema } from "enums/colorSchema";
import Title from "../global/Title";
import Subtitle from "../global/Subtitle";
import InputBoxGooglePlaces from "./InputBoxGooglePlaces";

type Props = {
  application: StorerApplication;
  handleChange: (key: keyof StorersDoc, value: string) => void;
};

const StorerInputFields: FC<Props> = ({
  application,
  handleChange,
}) => {
  const [address1, setAddress1] = useState<string>("");

  const refAddress1 = useRef<TextInput>(null);

  const initFormData = () => {
    handleChange("geocode", "");
    handleChange("country", "");
    handleChange("postalCode", "");
    handleChange("city", "");
  };
  const onLocationChanged = (
    data: GooglePlaceData,
    details: GooglePlaceDetail | null,
  ) => {
    if (
      details &&
      details.formatted_address &&
      details.geometry &&
      details?.address_components
    ) {
      handleChange("geocode", `${details?.geometry?.location}` || "");
      for (const component of details.address_components) {
        const componentType = component.types[0];
        switch (componentType) {
          case "administrative_area_level_1": {
            handleChange("country", `${component.long_name}` || "");
            break;
          }
          case "sublocality_level_1": {
            handleChange("city", `${component.long_name}` || "");
            break;
          }
          case "locality": {
            if (
              !details.address_components?.find(
                (it) => it?.types[0] === "sublocality_level_1",
              )
            ) {
              handleChange("city", `${component.long_name}` || "");
            }
            break;
          }
          case "postal_code": {
            handleChange("postalCode", `${component.long_name}` || "");
            break;
          }
        }
      }
    } else {
      initFormData();
    }
  };

  const onChangeAddress = (addr: string, details: GooglePlaceDetail | null) => {
    handleChange("street", addr);
    setAddress1(addr);
  };

  return (
    <>
      <View className="mb-4">
        <Title title="Start as Storer" textColor="#FFFFFF" />
      </View>

      <Subtitle title="Storer Name" textColor="#FFFFFF" />
      <View className="mt-2 mb-6">
        <TextInput
          style={{
            fontFamily: "Nunito",
            width: "100%",
          }}
          placeholder="Joe Buxtonyou"
          keyboardType="default"
          value={application.name}
          placeholderTextColor={ColorSchema.PLACEHOLDER_COLOR}
          onChangeText={(input: string) => {
            handleChange("name", input.trim());
          }}
          className="p-4 bg-white rounded-[12px] text-[14px] leading-[20px] text-[#1E5455] font-medium"
        />
      </View>

      <Subtitle title="Storage Location" textColor="#FFFFFF" />
      <ScrollView
        horizontal
        scrollEnabled={false}
        keyboardShouldPersistTaps="always"
        style={{ flex: 1, marginTop: 8 }}
      >
        <InputBoxGooglePlaces
          inputRef={refAddress1}
          placeholder="Street"
          minLength={2}
          address={address1}
          isCompleted
          onChangeText={onChangeAddress}
          onLocationChanged={onLocationChanged}
          isError={false}
          errorText="Enter Address 1"
          returnKeyType="search"
        />
      </ScrollView>

      <View className="mt-2 flex flex-row justify-between items-center">
        <TextInput
          style={{ fontFamily: "Nunito", width: "49%" }}
          placeholder="Postal code"
          keyboardType="default"
          value={application.postalCode}
          placeholderTextColor={ColorSchema.PLACEHOLDER_COLOR}
          editable={false}
          className="p-4 bg-white rounded-[12px] text-[14px] leading-[20px] text-[#1E5455] font-medium"
        />

        <TextInput
          style={{ fontFamily: "Nunito", width: "49%" }}
          placeholder="City"
          keyboardType="default"
          value={application.city}
          placeholderTextColor={ColorSchema.PLACEHOLDER_COLOR}
          editable={false}
          className="p-4 bg-white rounded-[12px] text-[14px] leading-[20px] text-[#1E5455] font-medium"
        />
      </View>

      <View className="mt-2 mb-6">
        <TextInput
          style={{
            fontFamily: "Nunito",
            width: "100%",
            textAlignVertical: "top",
          }}
          placeholder="Country"
          keyboardType="default"
          value={application.country}
          placeholderTextColor={ColorSchema.PLACEHOLDER_COLOR}
          editable={false}
          className="p-4 bg-white rounded-[12px] text-[14px] leading-[20px] text-[#1E5455] font-medium"
        />
      </View>

      <Subtitle title="Opening Hours & Description" textColor="#FFFFFF" />
      <View className="mt-2 mb-6">
        <TextInput
          style={{
            fontFamily: "Nunito",
            width: "100%",
            height: 100,
            textAlignVertical: "top",
          }}
          placeholder="Type here"
          multiline
          numberOfLines={Platform.OS === "ios" ? null : 4}
          keyboardType="default"
          blurOnSubmit={false}
          value={application.openings}
          placeholderTextColor={ColorSchema.PLACEHOLDER_COLOR}
          onChangeText={(input: string) => {
            handleChange("openings", input.trim());
          }}
          className="p-4 bg-white rounded-[12px] text-[14px] leading-[20px] text-[#1E5455] font-medium"
        />
      </View>

      <Subtitle title="Storage space" textColor="#FFFFFF" />
      <View className="flex flex-row items-center mt-2">
        <TextInput
          style={{ fontFamily: "Nunito", width: "85%" }}
          placeholder="123"
          keyboardType="decimal-pad"
          value={
            application.storageSpace > 0
              ? application.storageSpace.toString()
              : ""
          }
          placeholderTextColor={ColorSchema.PLACEHOLDER_COLOR}
          onChangeText={(input: string) => {
            handleChange("storageSpace", input.trim());
          }}
          className="p-4 bg-white rounded-[12px] text-[14px] leading-[20px] text-[#1E5455] font-medium mr-4"
        />
        <Subtitle title="m3" textColor="#FFFFFF" />
      </View>
    </>
  );
};

export default memo(StorerInputFields);
