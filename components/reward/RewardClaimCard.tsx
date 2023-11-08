import { View, Text, TouchableOpacity } from "react-native";
import { memo, FC, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useGetWalletBalance } from "hooks/collectors/useGetWalletBalance";
import { ROUTES, RootStackParamList } from "navigation/NavigationTypes";
import { useGetKeys } from "hooks/collectors/useGetKeys";
import { useAppDispatch } from "redux/hooks";
import { claimMissionReward } from "redux/missions/missionClaimReward/missionClaimReward.actions";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  ROUTES.REWARD
>;

type Props = {
  publicAddress: string;
  accessToken: string;
  setPublicAddress: (arg: string) => void;
  setPrivateKey: (arg: string) => void;
  amountToClaim: number;
};

const RewardClaimCard: FC<Props> = ({
  publicAddress,
  accessToken,
  setPrivateKey,
  setPublicAddress,
  amountToClaim,
}) => {
  const navigation = useNavigation<NavigationProp>();

  const [balance, setBalance] = useState<string>("");

  const dispatch = useAppDispatch();

  /** GET KEYS FROM STORE */
  useGetKeys({ setPrivateKey, setPublicAddress });

  /** GET WALLET BALANCE */
  useGetWalletBalance({ publicAddress, setBalance });

  const handleClaimReward = () => {
    if (accessToken) {
      dispatch(
        claimMissionReward({
          accessToken,
          amount: amountToClaim * 1000000000000000000,
        }),
      );
    }
  };

  return (
    <View className="p-4 rounded-b-[12px]">
      <View className="p-0 flex flex-row items-center justify-between">
        <View className="flex flex-row items-center">
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[24px] leading-[36px] font-bold text-[#FFF] ml-2"
          >
            Wallet
          </Text>
        </View>
      </View>

      <View className="flex flex-row justify-between mt-6 mx-1">
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[16px] font-semibold text-[#FFF]"
        >
          Total Rewards
        </Text>
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[34px] font-normal text-[#FFF]"
        >
          {balance} $USDT
        </Text>
      </View>

      <View className="p-3 bg-[#FFFFFF] my-4 rounded-[8px]">
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[13px] font-normal text-[#2E6297]"
        >
          Ready To Claim
        </Text>
        <View className="flex flex-row items-center justify-between my-3">
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[24px] font-bold text-[#2E6297]"
          >
            {amountToClaim}1.00
          </Text>
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[16px] font-normal text-[#2E6297]"
          >
            $USDT
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleClaimReward}
          disabled={amountToClaim === 0}
        >
          <View className="bg-[#00B0AD] opacity-40 p-2 rounded-[8px]">
            <Text
              style={{ fontFamily: "Nunito" }}
              className="text-[16px] leading-[24px] font-black text-[#FFFFFF] text-center"
            >
              Claim
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(RewardClaimCard);
