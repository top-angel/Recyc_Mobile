import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { FC, memo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Clipboard from "expo-clipboard";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

import WalletDetails from "components/reward/WalletDetails";
import RewardClaimCard from "components/reward/RewardClaimCard";
import HeaderTitle from "components/header/HeaderTitle";
import BackButton from "components/header/BackButton";

const CollectorWallet: FC = () => {
  const route =
    useRoute<RouteProp<{ params: { publicAddress: string, privateKey: string } }>>();

  const { publicAddress, privateKey } = route.params;

  const copyToClipboard = async (value: string) => {
    await Clipboard.setStringAsync(value);
    Toast.show({
      type: "success",
      text1: "Copy to clipboard",
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-01-creator-background-dark-color">
      <View className="flex flex-row justify-between h-12 items-center px-8">
        <BackButton />
        <HeaderTitle bigIcon />
        <View className="w-6" />
      </View>
      <View className="flex-1">
        <RewardClaimCard
          publicAddress={publicAddress}
          amountToClaim=""
          accessToken=""
        />
        <ScrollView className="flex-1 bg-02-purple-mission">
          <WalletDetails
            publicAddress={publicAddress}
            privateKey={privateKey}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default memo(CollectorWallet);
