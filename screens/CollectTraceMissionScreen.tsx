import { SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { memo, FC, useState } from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import SinglePublicMissionImageHeader from "../components/collectors/SinglePublicMissionImageHeader";
import TraceMissionContent from "../components/collectors/TraceMissionContent";
import { useGetCollectorPublicAddress } from "../hooks/aggregates/useGetCollectorPublicAddress";
import Spinner from "../components/global/Spinner";
import { useFetchCollectItemsOnLoad } from "../hooks/aggregates/useFetchCollectItemsOnLoad";

const CollectTraceMissionScreen: FC = () => {
  const route = useRoute<RouteProp<{ params: { missionId: string } }>>();
  const { missionId } = route.params;

  const [page] = useState<number>(0);
  const [perPage] = useState<number>(10);

  /** GET CREATOR WALLET ADDRESS */
  const { publicAddress } = useGetCollectorPublicAddress();

  /** FETCH DATA ON LOAD BY WALLET ADDRESS AND BOUNTY ID */
  const { loading } = useFetchCollectItemsOnLoad({
    page,
    perPage,
    publicAddress,
  });

  return (
    <SafeAreaView
      style={StyleSheet.absoluteFillObject}
      className="bg-02-purple-mission"
    >
      {loading ? <Spinner /> : null}
      <ScrollView className="flex-1 p-0 bg-02-purple-mission rounded-t-[20px]">
        <SinglePublicMissionImageHeader />

        <TraceMissionContent missionId={missionId} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default memo(CollectTraceMissionScreen);
