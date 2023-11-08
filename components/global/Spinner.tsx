import { View } from "react-native";
import { FC, memo } from "react";
import * as Progress from "react-native-progress";

const Spinner: FC = () => {
  return (
    <View className="flex-1 items-center justify-center inset-0 absolute z-50 top-0 bottom-0 left-0 right-0">
      <Progress.Circle size={30} indeterminate color="#d0ddf2" />
    </View>
  );
};

export default memo(Spinner);
