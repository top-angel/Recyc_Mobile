import { View, Text, TouchableOpacity } from "react-native";
import { memo, FC } from "react";
import { Ionicons } from "@expo/vector-icons";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "lib/constants";

type Props = {
  onClose: (arg: boolean) => void;
  setAddress: (arg: string) => void;
  setGeocode: (arg: Geocode) => void;
};

const ModalSearchPlaces: FC<Props> = ({ onClose, setAddress, setGeocode }) => {
  return (
    <View className="flex-1 bg-03-green-mission">
      <View className="p-4 mt-12 flex flex-row justify-between items-center">
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[16px] leading-[24px] font-medium text-[#FFFFFF]"
        >
          Search place to mark your storage
        </Text>
        <TouchableOpacity onPress={() => onClose(false)}>
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View className="p-4 flex-1">
        <GooglePlacesAutocomplete
          placeholder="Search..."
          minLength={2}
          listViewDisplayed
          fetchDetails
          renderDescription={(row) => row.description}
          onPress={(data, details = null) => {
            setAddress(details?.formatted_address);
            setGeocode(details?.geometry?.location);
          }}
          query={{
            key: GOOGLE_API_KEY,
            language: "en",
          }}
          styles={{
            description: {
              fontWeight: "bold",
              color: "#1E5455",
            },
            textInputContainer: {
              backgroundColor: "transparent",
            },
            textInput: {
              height: 40,
              color: "#1E5455",
              backgroundColor: "#80D8D6",
              fontSize: 16,
              borderRadius: 12,
              fontWeight: "600",
            },
            listView: {
              zIndex: 99999,
            },
            row: {
              backgroundColor: "#80D8D6",
            },
            poweredContainer: {
              backgroundColor: "#80D8D6",
            },
          }}
          nearbyPlacesAPI="GooglePlacesSearch"
          filterReverseGeocodingByTypes={[
            "locality",
            "administrative_area_level_3",
          ]}
          debounce={200}
        />
      </View>
    </View>
  );
};

export default memo(ModalSearchPlaces);
