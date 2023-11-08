import { View, Text, TouchableOpacity } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { memo, FC } from "react";
import QRCodeBorderIcon from "../icons/QRCodeBorderIcon";

type Props = {
  setModalVisible: (arg: boolean) => void;
  hashedLink: string;
  totalItems: number;
};

const AggregatedQRCodeModal: FC<Props> = ({
  setModalVisible,
  hashedLink,
  totalItems,
}) => {
  return (
    <View className="flex-1 justify-end">
      <View className="bg-[#FFFFFF] rounded-t-[20px] p-5">
        <View className="flex flex-row items-center justify-between my-5">
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[16px] leading-[24px] font-medium text-[#454545]"
          >
            Item amount
          </Text>
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[14px] leading-[24px] font-medium text-[#454545]"
          >
            {totalItems}
          </Text>
        </View>
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[20px] leading-[36px] font-semibold text-02-collector-dark text-center"
        >
          Aggregated QR Code
        </Text>
        <View className="items-center justify-center mt-6 relative">
          <QRCodeBorderIcon />
          <View className="absolute top-0 left-0 bottom-0 right-0 justify-center items-center">
            <QRCode
              value={`${hashedLink}`}
              size={280}
              color="#1C3C59"
              enableLinearGradient
              linearGradient={[
                "rgba(146, 205, 208, 1)",
                "rgba(46, 98, 151, 1)",
              ]}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            setModalVisible(false);
          }}
        >
          <View className="p-4 bg-02-purple-mission my-6 rounded-[22px]">
            <Text
              style={{ fontFamily: "Nunito" }}
              className="text-[17px] leading-[24px] font-bold text-[#FFFFFF] text-center"
            >
              Go Back
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(AggregatedQRCodeModal);
