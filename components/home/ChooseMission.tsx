import { memo, FC } from "react";
import { View, Text, SafeAreaView, Dimensions, Platform } from "react-native";
import { ROUTES } from "navigation/NavigationTypes";
import BackButton from "../header/BackButton";
import HeaderTitle from "../header/HeaderTitle";
import { Item } from "./chooseMission.types";
import ChooseMissionButton from "./ChooseMissionButton";

type Props = {
  item: Item;
};

const ChooseMission: FC<Props> = ({ item }) => {
  const { width } = Dimensions.get("screen");

  const isIos = Platform.OS === "ios" || Platform.OS === "macos";

  return (
    <SafeAreaView>
      <View
        className="flex-1"
        style={{ backgroundColor: item.backgroundColor, width }}
      >
        <View className="flex-1 relative">
          <View className="h-[40px]" />

          <View
            className={
              isIos
                ? "flex flex-row items-center absolute z-10 top-5"
                : "flex flex-row items-center absolute z-10 top-12"
            }
          >
            <BackButton />
            <View className="flex-1 justify-center items-center">
              <HeaderTitle navigateToHome={ROUTES.HOME} />
            </View>
          </View>

          <View className="flex-1 mb-40 justify-center items-center">
            {item.icon}
          </View>

          <View className="absolute bottom-0 bg-white h-[300px] w-[80%] rounded-tr-[40px] p-8">
            {item.subIcon}

            <Text
              style={{ fontFamily: "Nunito" }}
              className="text-[30px] leading-[32px] text-[#000000] font-bold"
            >
              {item.screenTitle}
            </Text>

            <View className="mt-16">
              <ChooseMissionButton
                title={item.buttonTitle}
                route={item.route}
                background={item.buttonBackground}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default memo(ChooseMission);
