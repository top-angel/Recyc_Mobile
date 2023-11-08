import { View, Text, TouchableOpacity } from "react-native";
import { memo, FC } from "react";
import SlidersIcon from "../icons/SlidersIcon";
import SearchIcon from "../icons/SearchIcon";

type Props = {
  setModalVisible: (arg: boolean) => void;
};

const CollectorMissionSearch: FC<Props> = ({ setModalVisible }) => {
  return (
    <TouchableOpacity
      className="p-4 flex flex-row items-center justify-between"
      onPress={() => setModalVisible(true)}
    >
      <View className="flex flex-row items-center">
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[16px] leading-[36px] font-light text-[#FFFFFF] mr-2"
        >
          Filter
        </Text>
        <SlidersIcon
          style={{
            width: 24,
            height: 25,
            color: "#FFFFFF",
          }}
        />
      </View>

      <View className="flex flex-row items-center">
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[16px] leading-[36px] font-light text-[#FFFFFF] mr-2"
        >
          Search
        </Text>
        <SearchIcon style={{ width: 24, height: 24, color: "#FFFFFF" }} />
      </View>
    </TouchableOpacity>
  );
};

export default memo(CollectorMissionSearch);
