import { View } from "react-native";
import { FC, memo } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

type Props = {
  lat: number;
  lng: number;
};

const StorageMap: FC<Props> = ({ lat, lng }) => {
  return (
    <View className="h-[72px] w-full">
      <MapView
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.001422,
          longitudeDelta: 0.00421,
        }}
        style={{
          width: "100%",
          height: "100%",
        }}
        mapType="standard"
      >
        <Marker
          coordinate={{
            latitude: lat,
            longitude: lng,
          }}
        />
      </MapView>
    </View>
  );
};

export default memo(StorageMap);
