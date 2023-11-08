import { memo, FC, ReactElement } from "react";
import { Text, View } from "react-native";

type Props = {
  title: string;
  subtitle: string;
  iconLeft: ReactElement<any, any>;
  iconRight: ReactElement<any, any>;
  titleColor: string;
  subtitleColor: string;
};

const DetailsOptionCard: FC<Props> = ({
  title,
  subtitle,
  iconLeft,
  iconRight,
  titleColor,
  subtitleColor,
}) => {
  return (
    <View className="bg-white flex flex-row items-center p-4 rounded-[12px]">
      {iconLeft}
      <View className="flex flex-row items-center justify-between flex-1 ml-4">
        <View>
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
    </View>
  );
};

export default memo(DetailsOptionCard);
