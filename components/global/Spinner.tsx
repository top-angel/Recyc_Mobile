import { View } from "react-native";
import { FC, memo } from "react";
import * as Progress from "react-native-progress";

const Spinner: FC = () => {
  return (
    <View className="flex-1 items-center justify-center inset-0 absolute z-50 top-0 bottom-0 left-0 right-0">
      <View className="flex w-[60px] h-[60px] justify-center items-center bg-[#000]/[0.4] rounded-xl">
        <Progress.Circle size={30} indeterminate color="#101828" />
      </View>
    </View>
  );
};

export default memo(Spinner);
