import { memo, FC } from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View } from "react-native";
import ArrowBackIcon from "../icons/ArrowBackIcon";

interface Props {
  goBackAction: () => void;
}

const CustomBackButton: FC<Props> = ({ goBackAction }) => {
  return (
    <TouchableOpacity onPress={() => goBackAction()}>
      <View>
        <ArrowBackIcon
          style={{
            width: 24,
            height: 24,
            color: "#FFFFFF",
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default memo(CustomBackButton);
