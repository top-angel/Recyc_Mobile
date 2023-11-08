import React, { RefObject, useState, useEffect, useRef, memo, FC } from "react";
import {
  StyleSheet,
  View,
  ImageSourcePropType,
  TextInput,
  ReturnKeyTypeOptions,
  Keyboard,
  Dimensions,
} from "react-native";
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "lib/constants";

interface InputBoxGooglePlacesProps {
  autoFocus?: boolean;
  isError?: boolean;
  errorText?: string;
  address?: string;
  isCompleted: boolean;
  placeholder?: string;
  onChangeText: (address: string, details: GooglePlaceDetail | null) => void;
  onLocationChanged: (
    data: GooglePlaceData,
    details: GooglePlaceDetail | null,
  ) => void;
  minLength?: number;
  icon?: ImageSourcePropType;
  inputRef?: RefObject<TextInput>;
  onSubmitEditing?: () => void;
  returnKeyType?: ReturnKeyTypeOptions;
  width?: number;
  initValue?: string;
}

const windowWidth = Dimensions.get("window").width;

const InputBoxGooglePlaces: FC<InputBoxGooglePlacesProps> = (props) => {
  const [focus, setFocus] = useState<boolean>(false);
  const ref = useRef();

  useEffect(() => {
    ref?.current?.setAddressText(props.address);
  }, []);

  const onChangeText = (text: string) => {
    props.onChangeText(text, null);
  };

  return (
    <View style={{ width: windowWidth - 32 }}>
      <GooglePlacesAutocomplete
        ref={ref}
        placeholder={props?.placeholder || ""}
        minLength={2}
        listViewDisplayed
        fetchDetails
        onPress={(data, details = null) => {
          props.onLocationChanged(data, details);
          props.onChangeText(data.description, details);
          props.onSubmitEditing?.();
        }}
        query={{
          key: GOOGLE_API_KEY,
          language: "en",
          components: "country:us",
        }}
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={200}
        currentLocation={false}
        currentLocationLabel="Current location"
        enablePoweredByContainer={false}
        getDefaultValue={() => {
          return props.address; // text input default value
        }}
        textInputProps={{
          ref: props?.inputRef,
          returnKeyType: props.returnKeyType || "search",
          onSubmitEditing: props.onSubmitEditing || Keyboard.dismiss,
          placeholderTextColor: "rgba(30, 84, 85, 0.4)",
          value: props.address,
          onChangeText: (text) => onChangeText(text),
          onBlur: () => setFocus(false),
          style: styles.inputBox,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
    borderRadius: 12,
    fontSize: 14,
    color: "#1E5455",
    fontFamily: "Nunito",
    // fontStyle: 500,
  },
});

export default memo(InputBoxGooglePlaces);
