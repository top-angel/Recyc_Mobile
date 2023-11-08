import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { memo, FC, useState } from "react";
import { useShowNavigationHeader } from "../hooks/useShowNavigationHeader";
import { ColorSchema } from "../enums/colorSchema";
import { ROUTES } from "../navigation/NavigationTypes";
import { useAppSelector } from "../redux/hooks";
import { useGetStorerPublicAddress } from "../hooks/storer/useGetStorerPublicAddress";
import Spinner from "../components/global/Spinner";
import { useStorerAggregatedItemsOnLoad } from "../hooks/storer/useStorerAggregatedItemsOnLoad";
import SingleStorerAggregatedItem from "../components/aggregation/SingleStorerAggregatedItem";
import Pagination from "../components/global/Pagination";

const StorerAggregatedCodeScreen: FC = () => {
  const [page, setPage] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(10);

  const { total, aggregatedItems, success } = useAppSelector(
    (state) => state.bountiesGetAllAggregates,
  );

  /** GET STORER PUBLIC ADDRESS */
  const { publicAddress } = useGetStorerPublicAddress();

  /** FETCH STORER AGGREGATED ITEMS ON LOAD */
  const { loading } = useStorerAggregatedItemsOnLoad({
    page,
    perPage,
    publicAddress,
  });

  /* Show navigation header */
  useShowNavigationHeader({
    headerColor: ColorSchema.STORER_COLOR,
    isBackVisible: true,
    isTitleVisible: true,
    navigateToHome: ROUTES.HOME,
  });

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      {loading ? <Spinner /> : null}
      <ScrollView className="flex-1 p-0 bg-03-green-mission">
        <View className="flex flex-row items-center justify-between p-4 mt-6">
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[22px] leading-[36px] font-bold text-[#FFFFFF]"
          >
            Aggregated QR Codes
          </Text>
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[16px] leading-[36px] font-medium text-[#FFFFFF]"
          >
            {total} items
          </Text>
        </View>

        {success && total > 0 ? (
          <View className="p-4">
            {aggregatedItems.map((item) => (
              <SingleStorerAggregatedItem key={item._id} item={item} />
            ))}
          </View>
        ) : null}

        {success && total > 0 ? (
          <View className="p-4">
            <Pagination
              page={page}
              perPage={perPage}
              total={total}
              setPage={setPage}
              setPerPage={setPerPage}
              primaryColor="#EEFBF8"
              secondaryColor="#1E5455"
            />
          </View>
        ) : null}

        {success && total === 0 ? (
          <View className="mt-6">
            <Text
              style={{ fontFamily: "Nunito" }}
              className="text-[16px] leading-[36px] font-medium text-[#FFFFFF] text-center"
            >
              You do not have aggregated QR codes.
            </Text>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default memo(StorerAggregatedCodeScreen);
