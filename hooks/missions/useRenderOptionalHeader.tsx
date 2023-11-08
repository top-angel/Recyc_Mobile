import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import BackButton from "components/header/BackButton";
import HeaderTitle from "components/header/HeaderTitle";
import { ColorSchema } from "enums/colorSchema";
import { ROUTES } from "navigation/NavigationTypes";

type Props = {
  isWithImage: boolean;
};

const useRenderOptionalHeader = ({ isWithImage }: Props) => {
  const navigation = useNavigation<any>();

  useLayoutEffect(() => {
    if (!isWithImage) {
      navigation.setOptions({
        headerStyle: {
          backgroundColor: ColorSchema.CREATOR_COLOR,
          borderBottomWidth: 0,
          shadowColor: "transparent",
          elevation: 0,
          padding: 20,
        },
        headerBackTitleVisible: false,
        headerShadowVisible: false,
        headerTitleAlign: "center",
        headerTitle: () => <HeaderTitle navigateToHome={ROUTES.HOME} />,
        headerLeft: () => <BackButton />,
      });
    }

    if (isWithImage) {
      navigation.setOptions({
        headerShown: false,
      });
    }
  }, [navigation, isWithImage]);
};

export { useRenderOptionalHeader };
