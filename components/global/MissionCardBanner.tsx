import { View, Text } from "react-native";
import { memo, FC, useMemo } from "react";

type Props = {
  title: string;
  subtitle: string;
  totalItems: number;
  approvedItems: number;
  backgroundColor: string;
};

const MissionCardBanner: FC<Props> = ({
  title,
  subtitle,
  totalItems,
  approvedItems,
  backgroundColor,
}) => {
  const percent = useMemo(
    () => Math.round(approvedItems / totalItems),
    [approvedItems, totalItems],
  );

  return (
    <View style={{ backgroundColor }} className="rounded-[20px] p-4">
      <Text
        style={{ fontFamily: "Nunito" }}
        className="text-[22px] leading-[36px] font-bold text-[#454545]"
      >
        {title}
      </Text>
      <Text
        style={{ fontFamily: "Nunito" }}
        className="text-[14px] leading-[20px] font-medium text-[#394E50]"
      >
        {subtitle}
      </Text>
      <Text
        style={{ fontFamily: "Nunito" }}
        className="text-[14px] leading-[20px] font-normal text-[#FFFFFF] text-right"
      >
        {approvedItems}/{totalItems}
      </Text>

      <View className="w-full flex flex-row items-center my-4 rounded-[15px]">
        <View
          className="h-[10px] bg-[#394E50] rounded-l-[15px]"
          style={{
            width: `${percent}%`,
            borderTopRightRadius: percent === 100 ? 15 : 0,
            borderBottomRightRadius: percent === 100 ? 15 : 0,
          }}
        />
        <View
          className="h-[10px] bg-[#FFFFFF] rounded-r-[15px]"
          style={{
            width: `${100 - percent}%`,
            borderTopLeftRadius: percent === 0 ? 15 : 0,
            borderBottomLeftRadius: percent === 0 ? 15 : 0,
          }}
        />
      </View>
    </View>
  );
};

export default memo(MissionCardBanner);
