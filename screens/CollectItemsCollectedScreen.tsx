import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { memo, FC, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import SingleCollectedItem from "../components/aggregation/SingleCollectedItem";
import SinglePublicMissionImageHeader from "../components/collectors/SinglePublicMissionImageHeader";
import Pagination from "../components/global/Pagination";
import Spinner from "../components/global/Spinner";
import { useFetchCollectItemsOnLoad } from "../hooks/aggregates/useFetchCollectItemsOnLoad";
import { useGetCollectorPublicAddress } from "../hooks/aggregates/useGetCollectorPublicAddress";
import { useRedirectOnSuccessAggregation } from "../hooks/aggregates/useRedirectOnSuccessAggregation";
import { RootStackParamList, ROUTES } from "../navigation/NavigationTypes";
import { generateAggregationLinkAsCollector } from "../redux/bounties/bountyClaimAsCollector/bountyClaimAsCollector.actions";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  ROUTES.COLLECT_ITEMS_COLLECTED
>;

const CollectItemsCollectedScreen: FC = () => {
  const route = useRoute<RouteProp<{ params: { missionId: string } }>>();
  const { missionId } = route.params;

  const navigate = useNavigation<NavigationProp>();

  const [page, setPage] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(10);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const { success, total, bountyItems } = useAppSelector(
    (state) => state.bountyClaimedByWallet,
  );
  const dispatch = useAppDispatch();

  /** GET CREATOR WALLET ADDRESS */
  const { publicAddress } = useGetCollectorPublicAddress();

  /** FETCH DATA ON LOAD BY WALLET ADDRESS AND BOUNTY ID */
  const { loading } = useFetchCollectItemsOnLoad({
    page,
    perPage,
    publicAddress,
  });

  /** REDIRECT USER ON GENERATED AGGREGATION LINK */
  useRedirectOnSuccessAggregation();

  const handleSelectAll = () => {
    if (selectedItems.length === 0) {
      setSelectedItems(
        bountyItems
          .filter((isused) => !isused.isUsedByCollector)
          .map((sernum) => sernum.serialNumber),
      );
    } else {
      setSelectedItems([]);
    }
  };

  const handleGenerateQrCode = () => {
    if (selectedItems.length > 0 && missionId) {
      dispatch(
        generateAggregationLinkAsCollector({
          walletAddress: publicAddress,
          items: selectedItems,
          missionId,
        }),
      );
    }
  };

  return (
    <SafeAreaView
      style={StyleSheet.absoluteFillObject}
      className="bg-02-purple-mission"
    >
      {loading ? <Spinner /> : null}
      <ScrollView className="flex-1 p-0 bg-02-purple-mission rounded-t-[20px]">
        <SinglePublicMissionImageHeader />

        <View className="flex-1 bg-02-purple-mission rounded-t-[20px] z-40 p-4 -mt-7">
          <View className="mt-2 flex flex-row items-center justify-between">
            <Text
              style={{ fontFamily: "Nunito" }}
              className="text-[22px] leading-[36px] font-bold text-[#FFFFFF]"
            >
              Collected items
            </Text>
            <Text
              style={{ fontFamily: "Nunito" }}
              className="text-[16px] leading-[36px] font-medium text-[#FFFFFF]"
            >
              {total} items
            </Text>
          </View>

          {success && total > 0 ? (
            <View className="flex flex-row items-center justify-between my-4">
              <TouchableOpacity onPress={handleSelectAll}>
                <Text
                  style={{ fontFamily: "Nunito" }}
                  className="text-[15px] leading-[20px] font-medium text-[#FFFFFF]"
                >
                  Select all
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigate.navigate(ROUTES.COLLECT_AGGREGATED_QRCODE)
                }
              >
                <Text
                  style={{ fontFamily: "Nunito" }}
                  className="text-[15px] leading-[20px] font-medium text-[#FFFFFF]"
                >
                  See aggregated QR code
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}

          {selectedItems.length > 0 ? (
            <TouchableOpacity
              className="mt-4 mb-2"
              onPress={handleGenerateQrCode}
            >
              <View className="p-4 rounded-[12px] bg-[#E3EAEF]">
                <Text
                  style={{ fontFamily: "Nunito" }}
                  className="text-[16px] leading-[26px] font-semibold text-[#1C3C59] text-center"
                >
                  Generate QR Code
                </Text>
              </View>
            </TouchableOpacity>
          ) : null}

          {success && total > 0 ? (
            <View className="mt-6">
              {bountyItems.map((item) => (
                <SingleCollectedItem
                  key={item._id}
                  item={item}
                  selected={selectedItems}
                  setSelected={setSelectedItems}
                />
              ))}
            </View>
          ) : null}

          {success && total > 0 ? (
            <Pagination
              page={page}
              perPage={perPage}
              total={total}
              setPage={setPage}
              setPerPage={setPerPage}
              primaryColor="#E3EAEF"
              secondaryColor="#1C3C59"
            />
          ) : null}

          {success && total === 0 ? (
            <View className="mt-6">
              <Text
                style={{ fontFamily: "Nunito" }}
                className="text-[16px] leading-[36px] font-medium text-[#FFFFFF] text-center"
              >
                You do not have collected items.
              </Text>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default memo(CollectItemsCollectedScreen);
