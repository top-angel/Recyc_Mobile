import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import BackButton from "../components/header/BackButton";
import HeaderTitle from "../components/header/HeaderTitle";

interface IProps {
  isBackVisible: boolean;
  isTitleVisible: boolean;
  headerColor: string;
  navigateToHome: string;
}

const useShowNavigationHeader = ({
  isBackVisible,
  isTitleVisible,
  headerColor,
  navigateToHome,
}: IProps) => {
  const navigation = useNavigation<any>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: headerColor,
        borderBottomWidth: 0,
        shadowColor: "transparent",
        elevation: 0,
        padding: 20,
      },
      headerBackTitleVisible: false,
      headerShadowVisible: false,
      headerTitleAlign: "center",
      headerTitle: () =>
        isTitleVisible ? <HeaderTitle navigateToHome={navigateToHome} /> : null,
      headerLeft: () => (isBackVisible ? <BackButton /> : null),
    });
  }, [navigation, isBackVisible, isTitleVisible, headerColor, navigateToHome]);
};

export { useShowNavigationHeader };
