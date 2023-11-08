import { View, Text } from "react-native";
import { FC, memo } from "react";
import { useAppSelector } from "redux/hooks";
import { ColorSchema } from "enums/colorSchema";
import BottleIcon from "../icons/BottleIcon";

const ItemStatusBannerBig: FC = () => {
  const { result } = useAppSelector((state) => state.missionGetById);

  return (
    <View className="p-4 bg-01-creator-light-secondary rounded-[12px]">
      <View className="flex flex-row items-center justify-between">
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[18px] leading-[23px] font-bold text-01-creator-dark"
        >
          Mission Creator
        </Text>
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[12px] leading-[20px] text-01-creator-dark font-medium"
        >
          {result[0]?.company_name}
        </Text>
      </View>

      <View className="flex flex-row items-center mt-4">
        <BottleIcon
          style={{
            width: 10,
            height: 24,
            color: ColorSchema.CREATOR_COLOR_ICON,
          }}
        />
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[20px] font-bold text-01-creator-dark ml-2"
        >
          20000
        </Text>
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[16px] text-01-creator-dark font-medium"
        >
          {" "}
          Returned Items
        </Text>
      </View>

      <View className="flex flex-row items-center mt-2">
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[20px] text-01-creator-dark font-bold"
        >
          $ 13000
        </Text>

        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[16px] text-01-creator-dark font-medium"
        >
          {" "}
          / 87000 Allocated Rewards
        </Text>
      </View>
    </View>
  );
};

export default memo(ItemStatusBannerBig);
