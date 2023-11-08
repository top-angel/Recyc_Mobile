import { View, Text } from "react-native";
import { FC, memo, ReactElement } from "react";

type Props = {
  icon: ReactElement<any, any>;
  title: string;
  iconFooter: ReactElement<any, any>;
};

const IncidentsCard: FC<Props> = ({ icon, iconFooter, title }) => {
  return (
    <View className="bg-white rounded-[20px] p-4">
      <View className="flex flex-row items-center justify-between">
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[14px] leading-[20px] font-medium text-[#454545] ml-2"
        >
          {title}
        </Text>
        {icon}
      </View>
      <View className="mt-6">{iconFooter}</View>
    </View>
  );
};

export default memo(IncidentsCard);
