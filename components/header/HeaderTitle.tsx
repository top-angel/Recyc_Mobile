import { FC, memo } from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View } from "react-native";
import LogoIcon from "../icons/LogoIcon";

interface IProps {
  navigateToHome: string;
  bigIcon: boolean;
}

const HeaderTitle: FC<IProps> = ({ navigateToHome, bigIcon }) => {
  const navigation = useNavigation<any>();

  return (
    // <TouchableOpacity onPress={() => navigation.navigate(navigateToHome)}>
    <TouchableOpacity>
      <View>
        <LogoIcon
          style={
            bigIcon ? { width: 175, height: 40 } : { width: 116, height: 32 }
          }
        />
      </View>
    </TouchableOpacity>
  );
};

export default memo(HeaderTitle);
