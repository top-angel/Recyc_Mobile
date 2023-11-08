import { View, Text } from "react-native";
import { FC, memo, ReactElement } from "react";

type Props = {
  iconLeft: ReactElement<any, any>;
  title: string;
};

const AboutMissionCard: FC<Props> = ({ title, iconLeft }) => {
  return (
    <View
      className="p-4 flex flex-row items-center justify-center bg-[#E3EAEF] rounded-[6px]"
      style={{ width: "48%" }}
    >
      {iconLeft}
      <Text
        style={{ fontFamily: "Nunito" }}
        className="text-[14px] leading-[20px] font-bold text-[#425D7E] ml-2"
      >
        {title}
      </Text>
    </View>
  );
};

export default memo(AboutMissionCard);
