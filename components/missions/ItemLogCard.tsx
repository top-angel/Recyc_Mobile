import { View, Text } from "react-native";
import { memo, FC } from "react";

const ItemLogCard: FC = () => {
  return (
    <View className="mt-4">
      <View className="rounded-[12px] bg-01-creator-light-secondary p-4">
        <View className="flex flex-row items-center justify-between">
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[16px] leading-[36px] text-01-creator-dark font-medium"
          >
            Lee Chang
          </Text>
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[12px] leading-[36px] text-01-creator-dark font-medium"
          >
            Santa Fe, Mexico
          </Text>
        </View>

        <View className="mt-2 flex flex-row items-center justify-between">
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[16px] leading-[36px] text-01-creator-dark font-bold"
          >
            1
            <Text
              style={{ fontFamily: "Nunito" }}
              className="text-[14px] leading-[36px] text-01-creator-dark font-medium ml-2"
            >
              Collected
            </Text>
          </Text>
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[16px] leading-[36px] text-01-creator-dark font-bold"
          >
            0,0${" "}
            <Text
              style={{ fontFamily: "Nunito" }}
              className="text-[14px] leading-[36px] text-01-creator-dark font-medium ml-2"
            >
              Rewarded
            </Text>
          </Text>
        </View>
      </View>

      <View className="rounded-[12px] bg-01-creator-light-secondary p-4 mt-4">
        <View className="flex flex-row items-center justify-between">
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[16px] leading-[36px] text-01-creator-dark font-medium"
          >
            Jan Jensen
          </Text>
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[12px] leading-[36px] text-01-creator-dark font-medium"
          >
            Haarlem, Netherlands
          </Text>
        </View>

        <View className="mt-2 flex flex-row items-center justify-between">
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[16px] leading-[36px] text-01-creator-dark font-bold"
          >
            32
            <Text
              style={{ fontFamily: "Nunito" }}
              className="text-[14px] leading-[36px] text-01-creator-dark font-medium ml-2"
            >
              Stored
            </Text>
          </Text>
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[16px] leading-[36px] text-01-creator-dark font-bold"
          >
            8,40${" "}
            <Text
              style={{ fontFamily: "Nunito" }}
              className="text-[14px] leading-[36px] text-01-creator-dark font-medium ml-2"
            >
              Rewarded
            </Text>
          </Text>
        </View>

        <View className="h-[6px] bg-[#FFFFFF]" />

        <View className="flex flex-row items-center justify-between">
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[12px] leading-[36px] text-01-creator-dark font-medium"
          >
            Storer
          </Text>
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[12px] leading-[36px] text-01-creator-dark font-medium"
          >
            Haarlem, Netherlands
          </Text>
        </View>

        <View className="mt-2 flex flex-row items-center justify-between">
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[16px] leading-[36px] text-01-creator-dark font-bold"
          >
            Dirk De Jong
          </Text>
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[16px] leading-[36px] text-01-creator-dark font-bold"
          >
            0,0${" "}
            <Text
              style={{ fontFamily: "Nunito" }}
              className="text-[14px] leading-[36px] text-01-creator-dark font-medium ml-2"
            >
              Rewarded
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default memo(ItemLogCard);
