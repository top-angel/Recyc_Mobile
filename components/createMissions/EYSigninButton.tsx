import { View, Text } from "react-native";
import { memo, FC } from "react";
import EYIcon from "../icons/EYIcon";

type Props = {
  username: string;
};

const EYSigninButton: FC<Props> = ({ username }) => {
  return (
    <View className="p-4 bg-[#425D7E] rounded-[12px] flex flex-row items-center justify-between">
      <Text
        style={{ fontFamily: "Nunito" }}
        className="text-[#FFFFFF] text-[18px] leading-[23px] font-bold"
      >
        {username ? `Welcome back, ${username}` : "Sign in to E&Y"}
      </Text>
      <EYIcon style={{ width: 32, height: 32 }} />
    </View>
  );
};

export default memo(EYSigninButton);
