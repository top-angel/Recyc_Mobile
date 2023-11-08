import { View } from "react-native";
import { memo, FC } from "react";
import { ColorSchema } from "enums/colorSchema";
import LineIcon from "../icons/LineIcon";
import DotIcon from "../icons/DotIcon";

const CollectMissionLine: FC = () => {
  return (
    <View className="mb-8 mt-8 flex flex-row items-center">
      <View className="mr-2">
        <DotIcon />
      </View>
      <View className="mr-2">
        <DotIcon />
      </View>
      <LineIcon
        style={{
          width: 33,
          height: 7,
          color: ColorSchema.COLLECTOR_COLOR,
        }}
      />
    </View>
  );
};

export default memo(CollectMissionLine);
