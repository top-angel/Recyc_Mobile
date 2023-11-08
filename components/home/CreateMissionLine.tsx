import { FC, memo } from "react";
import { View } from "react-native";
import DotIcon from "../icons/DotIcon";
import LineIcon from "../icons/LineIcon";

const CreateMissionLine: FC = () => {
  return (
    <View className="mb-8 mt-8 flex flex-row items-center">
      <View className="mr-2">
        <LineIcon
          style={{
            width: 33,
            height: 7,
            color: "#4B6465",
          }}
        />
      </View>
      <View className="mr-2">
        <DotIcon />
      </View>
      <DotIcon />
    </View>
  );
};

export default memo(CreateMissionLine);
