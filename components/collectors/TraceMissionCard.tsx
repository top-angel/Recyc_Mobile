import { View, Text } from "react-native";
import { memo, FC, ReactElement } from "react";

type Props = {
  header: string;
  icon: ReactElement<any, any>;
  footerLeft: string;
  footerRight: string;
};

const TraceMissionCard: FC<Props> = ({
  header,
  icon,
  footerLeft,
  footerRight,
}) => {
  return (
    <View className="p-4 bg-[#E3EAEF] rounded-[12px]">
      <Text
        style={{ fontFamily: "Nunito" }}
        className="text-[18px] leading-[23px] font-bold text-02-purple-mission"
      >
        {header}
      </Text>
      <View className="bg-[#ABC0D5] p-2 rounded-[6px] flex flex-row items-center justify-center w-[180px] my-4">
        {icon}
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[14px] leading-[20px] font-bold text-[#1C3C59] ml-2"
        >
          2 Items
        </Text>
      </View>
      <View className="flex flex-row items-center justify-between">
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[12px] leading-[20px] font-medium text-[#626888]"
        >
          {footerLeft}
        </Text>
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[12px] leading-[20px] font-medium text-[#626888]"
        >
          {footerRight}
        </Text>
      </View>
    </View>
  );
};

export default memo(TraceMissionCard);
