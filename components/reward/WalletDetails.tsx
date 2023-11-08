import { View, Text, TouchableOpacity } from "react-native";
import { FC, memo, useState } from "react";
import WalletIcon from "components/icons/WalletIcon";
import CopyIcon from "components/icons/CopyIcon";
import * as Clipboard from "expo-clipboard";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import EyeIcon from "components/icons/EyeIcon";

type Props = {
  publicAddress: string;
  privateKey: string;
};

const WalletDetails: FC<Props> = ({ publicAddress, privateKey }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const copyToClipboard = async (value: string) => {
    await Clipboard.setStringAsync(value);
    Toast.show({
      type: "success",
      text1: "Copy to clipboard",
    });
  };

  return (
    <View className="p-4">
      <View className="flex flex-row items-center justify-between">
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[16px] leading-[24px] font-medium text-[#FFF]"
        >
          Wallet Settings
        </Text>
        <WalletIcon />
      </View>

      <View className="p-2 border border-[#FFF] my-4 rounded-[8px] space-y-2 relative">
        <View className="flex flex-row items-center justify-between">
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[12px] leading-[17px] font-semibold text-[#FFF] -tracking-wider"
          >
            Your address
          </Text>

          <TouchableOpacity
            className="p-2"
            onPress={() => copyToClipboard(publicAddress)}
          >
            <CopyIcon style={{width: 18, height: 18, color: 'white'}}/>
          </TouchableOpacity>
        </View>

        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[12px] leading-[17px] font-normal text-[#FFF] -tracking-widest overflow-hidden text-ellipsis"
        >
          {publicAddress}
        </Text>
      </View>

      <View className="p-2 border border-[#FFF] my-4 rounded-[8px] space-y-2">
        <View className="flex flex-row items-center justify-between">
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[12px] leading-[17px] font-semibold text-[#FFF] -tracking-wider"
          >
            Private Key
          </Text>
          <View className="flex flex-row items-center">
            <View className="flex flex-row items-center">
              <Text
                style={{ fontFamily: "Nunito" }}
                className="text-[10px] leading-[13px] font-semibold text-[#FFF] -tracking-wider"
              >
                Tap to reveal
              </Text>

              <TouchableOpacity
                className="p-2"
                onPress={() => setIsVisible(!isVisible)}
              >
                <EyeIcon />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {isVisible ? (
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[12px] leading-[17px] font-normal text-[#FFF] -tracking-widest overflow-hidden text-ellipsis"
          >
            {privateKey}
          </Text>
        ) : null}

        {!isVisible ? (
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[12px] leading-[17px] font-normal text-[#FFF] -tracking-widest overflow-hidden text-ellipsis"
          >
            {/* **************************************************************** */}
            {privateKey}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

export default memo(WalletDetails);
