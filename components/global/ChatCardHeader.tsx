import { View, Text } from "react-native";
import { memo, FC } from "react";

type Props = {
  headerBackground: string;
  name: string;
  signature: string;
  avatar: React.ReactElement<any, any>;
};

const ChatCardHeader: FC<Props> = ({
  headerBackground,
  name,
  signature,
  avatar,
}) => {
  return (
    <View
      className="flex flex-row justify-between items-center p-4"
      style={{ backgroundColor: headerBackground }}
    >
      <View className="space-y-4">
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[18px] leading-[25px] font-bold text-[#FFFFFF]"
        >
          {name}
        </Text>
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[16px] leading-[22px] font-normal text-[#FFFFFF]"
        >
          {signature}
        </Text>
      </View>

      <View className="flex items-end">{avatar}</View>
    </View>
  );
};

export default memo(ChatCardHeader);
