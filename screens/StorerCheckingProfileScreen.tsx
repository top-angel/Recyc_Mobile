import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { memo, FC } from "react";

import { ROUTES } from "../navigation/NavigationTypes";
import { useShowNavigationHeader } from "../hooks/useShowNavigationHeader";
import { ColorSchema } from "../enums/colorSchema";
import NoGpsIcon from "../components/icons/NoGpsIcon";
import { useGetPrivateKey } from "../hooks/storer/useGetPrivateKey";
import { useCreateEthAccount } from "../hooks/creators/useCreateEthAccount";
import { useCheckIfStorerExists } from "../hooks/storer/useCheckIfStorerExists";
import { useRedirectStorer } from "../hooks/storer/useRedirectStorer";
import Spinner from "../components/global/Spinner";

const StorerCheckingProfileScreen: FC = () => {
  /* Show navigation header */
  useShowNavigationHeader({
    headerColor: ColorSchema.STORER_COLOR,
    isBackVisible: true,
    isTitleVisible: true,
    navigateToHome: ROUTES.HOME,
  });

  /** GET PRIVATE KEY FROM SECURE STORE */
  const { privateKey } = useGetPrivateKey();

  /** CREATE ETH WALLET WITH PRIVATE KEY */
  const { publicAddress } = useCreateEthAccount({ privateKey });

  /** CHECK IF STORER EXISTS BY WALLET ADDRESS */
  useCheckIfStorerExists({ publicAddress });

  /** REDIRECT STORER AFTER CHECKING */
  const { loading } = useRedirectStorer();

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      {loading ? <Spinner /> : null}
      <View className="flex-1 bg-03-green-mission">
        <View className="flex-1 mb-40 justify-center items-center">
          <NoGpsIcon />
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[24px] leading-[32px] text-03-storer-icon font-bold"
          >
            Checking storer...
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default memo(StorerCheckingProfileScreen);
