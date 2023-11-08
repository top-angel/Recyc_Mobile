import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { FC, memo, useState } from "react";
import SingleMissionImageHeader from "../components/createdMissions/SingleMissionImageHeader";
import { useAppSelector } from "../redux/hooks";
import { useGetCreatorPublicAddress } from "../hooks/aggregates/useGetCreatorPublicAddress";
import { useFetchDataOnLoadByWallet } from "../hooks/aggregates/useFetchDataOnLoadByWallet";
import Spinner from "../components/global/Spinner";
import SingleTraceReport from "../components/aggregation/SingleTraceReport";
import Pagination from "../components/global/Pagination";

const CreatorTraceReportScreen: FC = () => {
  const [page, setPage] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(10);

  const { total, success, bountyItems } = useAppSelector(
    (state) => state.bountyClaimedByWallet,
  );

  /** GET CREATOR WALLET ADDRESS */
  const { publicAddress } = useGetCreatorPublicAddress();

  /** FETCH DATA ON LOAD BY WALLET ADDRESS AND BOUNTY ID */
  const { loading } = useFetchDataOnLoadByWallet({
    page,
    perPage,
    publicAddress,
  });

  return (
    <SafeAreaView
      style={StyleSheet.absoluteFillObject}
      className="bg-01-blue-mission"
    >
      {loading ? <Spinner /> : null}
      <ScrollView className="flex-1 p-0 bg-[#FFFFFF]">
        <SingleMissionImageHeader />
        <View className="flex-1 bg-white rounded-t-[20px] z-40 p-4 -mt-7">
          <View className="flex flex-row items-center justify-between">
            <Text
              style={{ fontFamily: "Nunito" }}
              className="text-[22px] leading-[36px] font-bold text-01-creator-dark-secondary"
            >
              Items
            </Text>
            <Text
              style={{ fontFamily: "Nunito" }}
              className="text-[16px] leading-[36px] font-medium text-01-creator-dark-secondary"
            >
              {total} items
            </Text>
          </View>

          {success && total > 0 ? (
            <View className="mt-6">
              {bountyItems.map((bounty) => (
                <SingleTraceReport key={bounty._id} bounty={bounty} />
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
              primaryColor="#394E50"
              secondaryColor="#D3ECED"
            />
          ) : null}

          {success && total === 0 ? (
            <View className="mt-6">
              <Text
                style={{ fontFamily: "Nunito" }}
                className="text-[16px] leading-[36px] font-medium text-01-creator-dark-secondary text-center"
              >
                You do not have linked aggregated items
              </Text>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default memo(CreatorTraceReportScreen);
