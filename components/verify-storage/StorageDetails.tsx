import { View, Text, TouchableOpacity } from "react-native";
import { FC, memo, useMemo } from "react";
import { ColorSchema } from "enums/colorSchema";
import StorageMap from "./StorageMap";
import { useAppSelector } from "../../redux/hooks";
import MapIcon from "../icons/MapIcon";
import DetailsInput from "../global/DetailsInput";

const StorageDetails: FC = () => {
  const { total } = useAppSelector((state) => state.bountyGetStorerItems);

  const { result, status } = useAppSelector((state) => state.storerGetProfile);

  const worktime = result.profile.worktime?.split("\n");

  const percent = useMemo(
    () =>
      result.profile.storageSpace
        ? parseFloat((total / result.profile.storageSpace).toFixed(3))
        : 0,
    [result, total],
  );

  return (
    <View className="p-4 bg-white rounded-[12px] mt-4">
      {result.profile.geocode ? (
        <StorageMap lat={result.profile.geocode.lat} lng={result.profile.geocode.lng} />
      ) : (
        <StorageMap lat={48.13793792594839} lng={11.572046573572774} />
      )}
      <View className="mt-2 flex flex-row items-center justify-between">
        <View className="flex  mr-10">
          <DetailsInput
            title={result.profile.name ? result.profile.name : "Rob Lawson"}
            fontWeight="700"
            color={ColorSchema.STORER_COLOR_ICON}
          />
        </View>
        <View className="flex-1">
          <DetailsInput
            title={result.profile.address ? result.profile.address : "Mission St. 123 432A - New York"}
            fontWeight="500"
            color={ColorSchema.STORER_COLOR_ICON}
          />
        </View>
      </View>

      <View className="mt-2">
        <DetailsInput
          title="Opening Hours"
          fontWeight="700"
          color={ColorSchema.STORER_COLOR_ICON}
        />
      </View>

      <View className="mt-2 flex flex-row items-center">
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[12px] leading-[20px] font-medium text-[#626888]"
        >
          {result.profile.worktime ? worktime[0] : "Mon-Fri: 10.00-17.00"}
        </Text>
      </View>

      {/* <View className="flex-1">
        {worktime?.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <View key={index}>
            <DetailsInput
              title={item}
              fontWeight="500"
              color={ColorSchema.STORER_COLOR_ICON}
            />
          </View>
        ))}
      </View> */}

      <View
        className="mt-2 p-4 rounded-[9px]"
        style={{ backgroundColor: "rgba(85, 192, 195, 0.23)" }}
      >
        <View className="w-[300px] flex flex-row items-center mb-2">
          <View
            className="h-[2px] bg-03-storer-icon"
            style={{
              width: `${percent === 0 ? percent : percent + 1}%`,
              borderTopRightRadius: percent === 100 ? 15 : 0,
              borderBottomRightRadius: percent === 100 ? 15 : 0,
            }}
          />
          <View
            className="h-[2px] bg-white"
            style={{
              width: `${100 - percent}%`,
              borderTopLeftRadius: percent === 0 ? 15 : 0,
              borderBottomLeftRadius: percent === 0 ? 15 : 0,
            }}
          />
        </View>

        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[16px] leading-[20px] text-03-storer-icon font-bold text-center"
        >
          {total}/{result.profile.storageSpace} Items
        </Text>
      </View>

      <TouchableOpacity>
        <View className="flex flex-row items-center justify-between mt-4 rounded-[12px] border-[1px] border-03-storer-icon p-3">
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[18px] leading-[23px] text-03-storer-icon font-bold"
          >
            Copy Address
          </Text>

          <MapIcon style={{ width: 24, height: 24, color: "#1E5355" }} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default memo(StorageDetails);
