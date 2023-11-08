import { View } from "react-native";
import { memo, FC } from "react";
import LogoIcon from "components/icons/LogoIcon";

const CameraHeader: FC = () => {
  return (
    <View className="flex h-[110px] w-full items-center justify-end pb-4 bg-black ">
      <LogoIcon style={{ width: 175, height: 40 }} />
    </View>
  );
};

export default memo(CameraHeader);
