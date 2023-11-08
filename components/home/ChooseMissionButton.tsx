import { View, Text, TouchableOpacity } from "react-native";
import { FC, memo } from "react";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "navigation/NavigationTypes";

type Props = {
  title: string;
  route: ROUTES;
  background: string;
};

const ChooseMissionButton: FC<Props> = ({ title, route, background }) => {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity onPress={() => navigation.navigate(route)}>
      <View
        className="w-[250px] p-4 rounded-[22px]"
        style={{ backgroundColor: background }}
      >
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-center text-[16px] leading-[23px] text-[#FFF] font-bold"
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(ChooseMissionButton);
