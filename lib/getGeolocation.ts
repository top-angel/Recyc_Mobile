import * as Location from "expo-location";
import { Alert, Linking } from "react-native";
import Toast from "react-native-toast-message";

const getGeolocation = async () => {
  let geolocation: Geocode = {
    lat: 0,
    lng: 0,
  };

  const { status } = await Location.requestForegroundPermissionsAsync();

  if (
    status === Location.PermissionStatus.DENIED ||
    status === Location.PermissionStatus.UNDETERMINED
  ) {
    Alert.alert(
      "Geolocation permission",
      "Please, enable Geolocation to create a mission",
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

  if (status === Location.PermissionStatus.GRANTED) {
    Toast.show({
      type: "info",
      text1: "Setting location...",
    });

    const currentLocation = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    const { latitude, longitude } = currentLocation.coords;

    geolocation = {
      lat: latitude,
      lng: longitude,
    };
  }

  return {
    geocode: { geolocation, success: true, message: undefined, loading: false },
  };
};

export { getGeolocation };
