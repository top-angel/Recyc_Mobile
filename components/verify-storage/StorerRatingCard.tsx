import { View, Text } from "react-native";
import { memo, FC } from "react";
import StarIcon from "../icons/StarIcon";
import StarsIcon from "../icons/StarsIcon";

const StorerRatingCard: FC = () => {
  return (
    <View className="bg-white rounded-[20px] p-4 w-[100%]">
      <View className="flex flex-row items-center mb-4 justify-between">
        {/* <StarIcon /> */}
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[14px] leading-[20px] font-medium text-[#1E5355]"
        >
          Storer Rating
        </Text>
        <View className="flex flex-row items-center">
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[16px] font-medium text-[##1E5355]"
          >
            4.1
          </Text>
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[14px] font-medium text-[#1E5355]/[0.4]"
          >
            /5
          </Text>
        </View>
      </View>
      <View className="flex flex-row items-center justify-between">
        <StarsIcon />
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[14px] leading-[20px] font-normal text-[#1E5355] text-right"
        >
          0 Reviews
        </Text>
      </View>
    </View>
  );
};

export default memo(StorerRatingCard);
