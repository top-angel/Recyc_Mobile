import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { FC, memo, useState } from "react";
import { useShowNavigationHeader } from "../hooks/useShowNavigationHeader";
import { ColorSchema } from "../enums/colorSchema";
import { ROUTES } from "../navigation/NavigationTypes";
import { useGetStorerPublicAddress } from "../hooks/storer/useGetStorerPublicAddress";
import { useFetchAggregatedItemsOnLoad } from "../hooks/storer/useFetchAggregatedItemsOnLoad";
import Spinner from "../components/global/Spinner";
import { useAppSelector } from "../redux/hooks";
import SingleStoredItem from "../components/verify-storage/SingleStoredItem";
import Pagination from "../components/global/Pagination";

const StorerTrackItemsScreen: FC = () => {
  const [page, setPage] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(10);

  const { total, bountyItems, success } = useAppSelector(
    (state) => state.bountyGetStorerItems,
  );

  /* Show navigation header */
  useShowNavigationHeader({
    headerColor: ColorSchema.STORER_COLOR,
    isBackVisible: true,
    isTitleVisible: true,
    navigateToHome: ROUTES.HOME,
  });

  /** FETCH WALLET ADDRESS */
  const { publicAddress } = useGetStorerPublicAddress();

  /** FETCH AGGREGATED ITEMS ON LOAD */
  const { loading } = useFetchAggregatedItemsOnLoad({
    page,
    perPage,
    publicAddress,
  });

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      {loading ? <Spinner /> : null}
      <ScrollView className="flex-1 p-0 bg-03-green-mission">
        <View className="p-4">
          <View className="flex flex-row items-center justify-between">
            <Text
              style={{ fontFamily: "Nunito" }}
              className="text-[22px] leading-[36px] font-bold text-[#FFFFFF]"
            >
              Stored items
            </Text>
            <Text
              style={{ fontFamily: "Nunito" }}
              className="text-[16px] leading-[36px] font-medium text-[#FFFFFF]"
            >
              {total} items
            </Text>
          </View>

          {success && total > 0 ? (
            <View className="mt-6">
              {bountyItems.map((bounty) => (
                <SingleStoredItem key={bounty?._id} bounty={bounty} />
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
              primaryColor="#1E5355"
              secondaryColor="#80D8D6"
            />
          ) : null}

          {success && total === 0 ? (
            <View className="mt-6">
              <Text
                style={{ fontFamily: "Nunito" }}
                className="text-[16px] leading-[36px] font-medium text-[#FFFFFF] text-center"
              >
                You do not have stored items yet.
              </Text>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default memo(StorerTrackItemsScreen);
