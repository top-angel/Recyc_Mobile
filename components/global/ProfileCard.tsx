import { View, Text } from "react-native";
import { memo, FC, ReactElement } from "react";

type Props = {
  icon: ReactElement<any, any>;
  title: string;
  amount: string;
  footer: string;
};

const ProfileCard: FC<Props> = ({ icon, title, amount, footer }) => {
  return (
    <View className="bg-white rounded-[20px] p-4 w-[48%]">
      <View className="flex flex-row items-center mb-6 justify-between">
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[14px] leading-[20px] font-medium text-[#101828]"
        >
          {title}
        </Text>
        {icon}
      </View>

      <Text
        style={{ fontFamily: "Nunito" }}
        className="text-[16px] leading-[24px] font-bold text-[#454545]"
      >
        {amount}
      </Text>
      <Text
        style={{ fontFamily: "Nunito" }}
        className="text-[14px] leading-[20px] font-normal text-[#BBBBBB]"
      >
        {footer}
      </Text>
    </View>
  );
};

export default memo(ProfileCard);
