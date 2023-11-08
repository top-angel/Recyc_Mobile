import { memo, FC, ReactElement } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import CollectorIcon from "components/icons/CollectorIcon";
import StorerIcon from "components/icons/StorerIcon";
import CollectorSubtitleCategory from "components/createMissions/CollectorSubtitleCategory";
import { useNavigation } from "@react-navigation/native";

import { ROUTES } from "navigation/NavigationTypes";

type Props = {
  title: string;
  subtitle: string;
  iconLeft: ReactElement<any, any>;
  iconRight: ReactElement<any, any>;
  titleColor: string;
  subtitleColor: string;
  buttonColor: string;
};

const DetailsOptionCard: FC<Props> = ({
  title,
  subtitle,
  iconLeft,
  iconRight,
  titleColor,
  subtitleColor,
  buttonColor,
}) => {
  const navigate = useNavigation();

  const onPressStart = (val: string) => {
    if (val === 'Collector') {
      navigate.navigate(ROUTES.COLLECT_MISSIONS)
    } else {
      navigate.navigate(ROUTES.VERIFY_AND_STORAGE)
    }
  }

  return (
    <View
      className="flex-1 bg-white rounded-xl border-[3px] p-6"
      style={{ borderColor: buttonColor }}
    >
      <View className="flex-1 flex-row items-center justify-between">
        <View className="flex-1 flex-row items-center">
          {title === "Collector" ? <CollectorIcon /> : <StorerIcon />}
          <Text
            style={{ fontFamily: "Nunito", color: titleColor }}
            className="text-[22px] font-semibold ml-2"
          >
            {title}
          </Text>
        </View>
        <Text
          style={{ fontFamily: "Nunito", color: subtitleColor }}
          className="text-[12px] leading-[20px] font-medium"
        >
          {title === "Collector" ? 5389245 : 6628}
        </Text>
      </View>
      <Text
        style={{ fontFamily: "Nunito", color: subtitleColor }}
        className="text-[14px] leading-[20px] font-light my-6"
      >
        {subtitle}
      </Text>

      <TouchableOpacity
        className="flex-1 bg-red-300 items-center justify-center py-3 rounded-xl"
        style={{ backgroundColor: buttonColor }}
        onPress={() => onPressStart(title)}
      >
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[16px] leading-[20px] font-bold text-white"
        >
          Start as a {`${title}`}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default memo(DetailsOptionCard);
