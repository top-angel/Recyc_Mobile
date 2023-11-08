import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { memo, FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList, ROUTES } from "navigation/NavigationTypes";
import BottleIcon from "../icons/BottleIcon";

type Props = {
  headerTitle: string;
  iconTitle: string;
  footerTitle: string;
  route: ROUTES;
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  ROUTES.VERIFY_AND_STORAGE
>;

const ItemStatusBannerSmall: FC<Props> = ({
  headerTitle,
  iconTitle,
  footerTitle,
  route,
}) => {
  const navigate = useNavigation<NavigationProp>();

  return (
    <View className="p-4 bg-01-creator-light-secondary rounded-[12px]">
      <Text
        style={{ fontFamily: "Nunito" }}
        className="text-[18px] leading-[23px] text-01-creator-dark font-bold"
      >
        {headerTitle}
      </Text>

      <View className="flex flex-row bg-01-creator-light rounded-[6px] w-[180px] p-3 items-center justify-center mt-4">
        <BottleIcon
          style={{
            width: 10,
            height: 24,
            color: "#FFFFFF",
          }}
        />
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[14px] leading-[20px] text-[#FFFFFF] font-bold ml-4"
        >
          {iconTitle}
        </Text>
      </View>

      <View className="flex flex-row items-center justify-between mt-4">
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[12px] leading-[20px] text-01-creator-dark font-medium"
        >
          {footerTitle}
        </Text>

        <TouchableOpacity onPress={() => navigate.navigate(route as any)}>
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[12px] leading-[20px] text-01-creator-dark font-medium"
          >
            See details
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(ItemStatusBannerSmall);
