import { View, Text } from "react-native";
import { memo, FC } from "react";
import { BountyAggregatedDoc } from "redux/bounties/bountyAggregated.types";

type Props = {
  bounty: BountyAggregatedDoc;
};

const SingleTraceReport: FC<Props> = ({ bounty }) => {
  return (
    <View className="p-4 bg-01-creator-light-secondary mb-4 rounded-[12px]">
      <Text
        style={{ fontFamily: "Nunito" }}
        className="text-[13px] leading-[36px] font-normal text-center text-01-creator-dark-secondary"
      >
        SerNo: {bounty?.serialNumber}
      </Text>

      <View className="flex flex-row items-center justify-between mt-4">
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[16px] leading-[36px] font-normal text-01-creator-dark-secondary"
        >
          {bounty?.companyName}
        </Text>
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[16px] leading-[36px] font-bold text-01-creator-dark-secondary"
        >
          {bounty?.status}
        </Text>
      </View>
    </View>
  );
};

export default memo(SingleTraceReport);
