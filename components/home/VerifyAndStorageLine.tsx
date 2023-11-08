import { View } from "react-native";
import { FC, memo } from "react";
import { ColorSchema } from "enums/colorSchema";
import LineIcon from "../icons/LineIcon";
import DotIcon from "../icons/DotIcon";

const VerifyAndStorageLine: FC = () => {
  return (
    <View className="mb-8 mt-8 flex flex-row items-center">
      <View className="mr-2">
        <DotIcon />
      </View>
      <View className="mr-2">
        <LineIcon
          style={{
            width: 33,
            height: 7,
            color: ColorSchema.STORER_COLOR,
          }}
        />
      </View>
      <DotIcon />
    </View>
  );
};

export default memo(VerifyAndStorageLine);
