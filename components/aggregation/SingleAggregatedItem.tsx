import { View, Text, TouchableOpacity } from "react-native";
import { FC, memo } from "react";
import moment from "moment";
import { AggregatedItemDoc } from "redux/bounties/bountyAggregated.types";

type Props = {
  item: AggregatedItemDoc;
  handleViewQRCode: (arg: { link: string; itemLength: number }) => void;
};

const SingleAggregatedItem: FC<Props> = ({ item, handleViewQRCode }) => {
  return (
    <View className="p-4 bg-[#E3EAEF] mb-4 rounded-[12px]">
      <Text
        style={{ fontFamily: "Nunito" }}
        className="text-[13px] leading-[36px] font-normal text-center text-[#1C3C59]"
      >
        Link: {item?.hashedLink.substring(0, 20)}...
      </Text>

      <View className="flex flex-row items-center justify-between mt-4">
        <TouchableOpacity
          onPress={() =>
            handleViewQRCode({
              link: item?.hashedLink,
              itemLength: item?.items.length,
            })
          }
        >
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[14px] leading-[20px] font-semibold text-[#1C3C59]"
          >
            View QR code
          </Text>
        </TouchableOpacity>
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[12px] leading-[20px] font-normal text-[#1C3C59]"
        >
          {moment(item?.createdAt).format("DD.MM.YYYY HH:mm")}
        </Text>
      </View>
    </View>
  );
};

export default memo(SingleAggregatedItem);
