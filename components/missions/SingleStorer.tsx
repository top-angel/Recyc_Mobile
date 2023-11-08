import { View, Text, TouchableOpacity } from "react-native";
import { FC, memo, useCallback } from "react";

type Props = {
  item: Collectors;
  itemId: string;
  setItemId: (arg: string) => void;
};

const SingleStorer: FC<Props> = ({ item, setItemId, itemId }) => {
  const handlePress = useCallback(
    (id: string) => {
      if (itemId === id) {
        setItemId("");
      } else {
        setItemId(id);
      }
    },
    [setItemId, itemId],
  );

  return (
    <TouchableOpacity
      className="p-4 rounded-[12px] mb-4"
      style={{
        borderColor: itemId === item.id ? "#1E5455" : "",
        borderWidth: itemId === item.id ? 2 : 0,
        borderRadius: itemId === item.id ? 12 : 0,
        backgroundColor: "rgba(85, 192, 195, 0.23)",
      }}
      onPress={() => handlePress(item.id)}
    >
      <View className="flex flex-row items-center justify-between">
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[16px] leading-[36px] text-[#1E5455] font-medium"
        >
          {item?.name}
        </Text>
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[12px] leading-[36px] text-[#1E5455] font-medium"
        >
          {item?.address}
        </Text>
      </View>

      <View className="flex flex-row items-center justify-between">
        <View className="flex flex-row items-center">
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[22px] leading-[36px] text-[#1E5455] font-bold"
          >
            {item?.collected}
          </Text>
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[16px] leading-[36px] text-[#1E5455] font-medium ml-2"
          >
            Collected
          </Text>
        </View>

        <View className="flex flex-row items-center">
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[22px] leading-[36px] text-[#1E5455] font-bold"
          >
            {item?.rewarded}$
          </Text>
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[16px] leading-[36px] text-[#1E5455] font-medium ml-2"
          >
            Rewarded
          </Text>
        </View>
      </View>

      <View
        className={
          itemId !== item.id
            ? "hidden transition-all ease-in-out duration-700"
            : "flex flex-row items-center justify-between transition-all ease-in-out duration-700 mt-2"
        }
      >
        <View className="flex flex-row items-center">
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[12px] leading-[36px] text-[#1E5455] font-medium"
          >
            Last Scan:
          </Text>
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[12px] leading-[36px] text-[#1E5455] font-bold ml-2"
          >
            2 Days ago
          </Text>
        </View>

        <TouchableOpacity>
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[12px] leading-[36px] text-[#425D7E] font-medium"
          >
            See images
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default memo(SingleStorer);
