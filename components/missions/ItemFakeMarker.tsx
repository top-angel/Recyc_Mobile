import { View, Text } from "react-native";
import { memo, FC } from "react";
import { ColorSchema } from "enums/colorSchema";
import CopyIcon from "../icons/CopyIcon";

type Props = {
  positionX: number;
  positionY: number;
};

const ItemFakeMarker: FC<Props> = ({ positionX, positionY }) => {
  return (
    <View
      className="absolute bg-white p-2 flex flex-row"
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        top: positionX,
        left: positionY,
      }}
    >
      <Text
        style={{ fontFamily: "Nunito" }}
        className="text-[12px] leading-[36px] text-01-creator-dark font-medium"
      >
        0xfgj24420j2....
      </Text>
      <CopyIcon
        style={{
          width: 16,
          height: 16,
          color: ColorSchema.CREATOR_COLOR_ICON,
        }}
      />
    </View>
  );
};

export default memo(ItemFakeMarker);
