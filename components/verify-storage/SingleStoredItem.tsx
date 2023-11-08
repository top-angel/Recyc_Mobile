import { View, Text, TouchableOpacity } from "react-native";
import { memo, FC } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { BountyAggregatedDoc } from "redux/bounties/bountyAggregated.types";
import { RootStackParamList, ROUTES } from "navigation/NavigationTypes";
import { ItemStatus } from "enums/itemStatus.types";
import MaximizeIcon from "../icons/MaximizeIcon";

type Props = {
  bounty: BountyAggregatedDoc;
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  ROUTES.VERIFY_TRACK_ITEMS
>;

const SingleStoredItem: FC<Props> = ({ bounty }) => {
  const navigate = useNavigation<NavigationProp>();

  return (
    <View className="p-4 bg-03-storer-light mb-4 rounded-[12px]">
      <Text
        style={{ fontFamily: "Nunito" }}
        className="text-[13px] leading-[36px] font-normal text-center text-03-storer-icon"
      >
        SerNo: {bounty?.serialNumber}
      </Text>

      <View className="flex flex-row items-center justify-between mt-4">
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[16px] leading-[36px] font-normal text-03-storer-icon"
        >
          {bounty?.companyName}
        </Text>
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[16px] leading-[36px] font-bold text-03-storer-icon"
        >
          {bounty?.status}
        </Text>
      </View>

      {bounty?.status === ItemStatus.COLLECTED ? (
        <TouchableOpacity
          onPress={() =>
            navigate.navigate(ROUTES.VERIFY_QR_SCANNER_VERIFY, {
              bountyId: bounty?.bountyId,
            })
          }
        >
          <View className="p-4 rounded-[12px] bg-04-green-dark flex flex-row items-center justify-between">
            <Text
              style={{ fontFamily: "Nunito" }}
              className="text-[17px] leading-[22px] font-bold text-[#FFFFFF]"
            >
              Verify
            </Text>

            <MaximizeIcon style={{ width: 24, height: 24, color: "#FFFFFF" }} />
          </View>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default memo(SingleStoredItem);
