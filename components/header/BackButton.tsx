import { memo, FC } from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View } from "react-native";
import ArrowBackIcon from "../icons/ArrowBackIcon";

const BackButton: FC = () => {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
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

export default memo(BackButton);
