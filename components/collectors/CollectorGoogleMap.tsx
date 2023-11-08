import { FC, memo } from "react";
import { View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { getStorerById } from "redux/storers/storerGetById/storerGetById.action";

type Props = {
  lat: number;
  lng: number;
};

const CollectorGoogleMap: FC<Props> = ({ lat, lng }) => {
  const { storers } = useAppSelector((state) => state.storerSearchGeolocation);
  const dispatch = useAppDispatch();

  const handleMarker = (markerId: string) => {
    if (markerId) {
      dispatch(getStorerById({ id: markerId }));
    }
  };

  return (
    <View className="h-[80px] w-full">
      <MapView
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.001422,
          longitudeDelta: 0.05421,
        }}
        style={{
          width: "100%",
          height: "100%",
        }}
        mapType="standard"
      >
        {storers.map((item) => (
          <Marker
            key={item.id}
            coordinate={{
              latitude: item.geocode.lat,
              longitude: item.geocode.lng,
            }}
            onPress={() => handleMarker(item.id)}
          />
        ))}
      </MapView>
    </View>
  );
};

export default memo(CollectorGoogleMap);
