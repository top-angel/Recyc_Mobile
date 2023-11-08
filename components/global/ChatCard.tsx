import { View, Text } from "react-native";
import { memo, FC } from "react";

type Props = {
  item: Chat;
  backgroundColor: string;
  subtitleColor: string;
  chipColor: string;
};

const ChatCard: FC<Props> = ({
  item,
  backgroundColor,
  subtitleColor,
  chipColor,
}) => {
  return (
    <View
      className="flex flex-row rounded-[12px] p-4 mb-4"
      style={{ backgroundColor }}
    >
      {item?.icon}
      <View className="flex-1 ml-3">
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[14px] leading-[20px] font-bold text-[#FFFFFF] mb-1"
        >
          {item?.name}
        </Text>
        <Text
          style={{ fontFamily: "Nunito", color: subtitleColor }}
          className="text-[12px] leading-[20px] font-bold"
        >
          {item?.company ? item.company : item?.address}
        </Text>
      </View>
      <View className="flex items-end space-y-2">
        {item?.amount > 0 ? (
          <View
            style={{ backgroundColor: chipColor }}
            className="w-[20px] h-[20px] rounded-[10px]"
          >
            <Text
              style={{ fontFamily: "Nunito" }}
              className="text-[12px] leading-[20px] font-medium text-white text-center"
            >
              {item.amount}
            </Text>
          </View>
        ) : null}
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[12px] leading-[20px] font-medium text-white"
        >
          {item?.timestamp}
        </Text>
      </View>
    </View>
  );
};

export default memo(ChatCard);
