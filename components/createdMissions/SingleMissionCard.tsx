import { View, Text } from "react-native";
import { memo, FC, ReactElement } from "react";

type Props = {
  iconLeft: ReactElement<any, any>;
  iconRight: ReactElement<any, any>;
  title: string;
  subtitle: string;
  titleColor: string;
  subtitleColor: string;
};

const SingleMissionCard: FC<Props> = ({
  iconLeft,
  iconRight,
  title,
  subtitle,
  titleColor,
  subtitleColor,
}) => {
  return (
    <View className="flex flex-row items-center border border-[#87B9F8] rounded-[12px] p-4">
      {iconLeft}
      <View className="flex-1 ml-4">
        <Text
          style={{ fontFamily: "Nunito", color: titleColor }}
          className="text-[14px] leading-[20px] font-medium"
        >
          {title}
        </Text>
        <Text
          style={{ fontFamily: "Nunito", color: subtitleColor }}
          className="text-[12px] leading-[20px] font-light"
        >
          {subtitle}
        </Text>
      </View>
      {iconRight}
    </View>
  );
};

export default memo(SingleMissionCard);
