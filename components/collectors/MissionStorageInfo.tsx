import { View, Text, TouchableOpacity } from "react-native";
import { FC, memo } from "react";
import { useAppSelector } from "redux/hooks";
import MapIcon from "../icons/MapIcon";
import CollectorGoogleMap from "./CollectorGoogleMap";

const MissionStorageInfo: FC = () => {
  const percent = 2;

  const { geolocation } = useAppSelector((state) => state.globalSetGeolocation);
  const { result } = useAppSelector((state) => state.missionQueryPublic);
  const { storer } = useAppSelector((state) => state.storerGetById);

  return (
    <View className="p-4 bg-[#2E62974D] rounded-[12px] mt-4">
      <Text
        style={{ fontFamily: "Nunito" }}
        className="text-[18px] leading-[23px] font-bold text-[#2E6297] mb-3"
      >
        Storers around you
      </Text>
      {geolocation ? (
        <CollectorGoogleMap lat={geolocation?.lat} lng={geolocation?.lng} />
      ) : (
        <CollectorGoogleMap lat={48.13793792594839} lng={11.572046573572774} />
      )}

      <View className="mt-2 flex flex-row items-center justify-between">
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[12px] leading-[20px] font-medium text-[#626888]"
        >
          {storer?.name ? storer.name : "Rob Lawson"}
        </Text>
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[12px] leading-[20px] font-medium text-[#626888]"
        >
          {storer?.address ? storer.address : "Mission St. 123 432A - New York"}
        </Text>
      </View>

      <Text
        style={{ fontFamily: "Nunito" }}
        className="text-[12px] leading-[20px] font-bold text-[#626888] mt-2"
      >
        Opening Hours
      </Text>

      <View className="mt-2 flex flex-row items-center">
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[12px] leading-[20px] font-medium text-[#626888]"
        >
          {storer?.worktime ? storer.worktime : "Mon-Fri: 10.00-17.00"}
        </Text>
      </View>

      <View className="bg-[#E3EAEF] p-2 rounded-[9px] mt-2">
        <View className="w-full flex flex-row items-center my-2 rounded-[12px]">
          <View
            className="h-[5px] bg-[#626888] rounded-l-[15px]"
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
          className="text-[16px] leading-[20px] font-bold text-[#626888] text-center"
        >
          2 / {result[0]?.image_count} Items
        </Text>
      </View>

      <TouchableOpacity>
        <View className="flex flex-row items-center justify-between mt-4 rounded-[12px] border-[1px] border-[#2E6297] p-3">
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[18px] leading-[23px] text-[#2E6297] font-bold"
          >
            Get Direction
          </Text>

          <MapIcon style={{ width: 24, height: 24, color: "#2E6297" }} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default memo(MissionStorageInfo);
