import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Modal,
} from "react-native";
import { memo, FC, useState } from "react";
import { useGetCollectorPublicAddress } from "../hooks/aggregates/useGetCollectorPublicAddress";
import { useFetchAggregatedItemsOnLoad } from "../hooks/aggregates/useFetchAggregatedItemsOnLoad";
import Spinner from "../components/global/Spinner";
import SinglePublicMissionImageHeader from "../components/collectors/SinglePublicMissionImageHeader";
import { useAppSelector } from "../redux/hooks";
import SingleAggregatedItem from "../components/aggregation/SingleAggregatedItem";
import Pagination from "../components/global/Pagination";
import AggregatedQRCodeModal from "../components/aggregation/AggregatedQRCodeModal";

const CollectAggregatedQRCodeScreen: FC = () => {
  const [page, setPage] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(10);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [hashedLink, setHashedLink] = useState<string>("");
  const [totalItems, setTotalItems] = useState<number>(0);

  const { total, aggregatedItems, success } = useAppSelector(
    (state) => state.bountiesGetAllAggregates,
  );

  /** GET CREATOR WALLET ADDRESS */
  const { publicAddress } = useGetCollectorPublicAddress();

  /** FETCH AGGREGATED ITEMS ON LOAD */
  const { loading } = useFetchAggregatedItemsOnLoad({
    page,
    perPage,
    publicAddress,
  });

  const handleViewQRCode = ({
    link,
    itemLength,
  }: {
    link: string;
    itemLength: number;
  }) => {
    setHashedLink(link);
    setTotalItems(itemLength);
    setModalVisible(true);
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
          <View className="flex flex-row items-center justify-between">
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
            <View className="mt-6">
              {aggregatedItems.map((item) => (
                <SingleAggregatedItem
                  key={item._id}
                  item={item}
                  handleViewQRCode={handleViewQRCode}
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
                You do not have aggregated QR codes.
              </Text>
            </View>
          ) : null}
        </View>
      </ScrollView>

      {/* Modal */}
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        transparent
      >
        <AggregatedQRCodeModal
          setModalVisible={setModalVisible}
          hashedLink={hashedLink}
          totalItems={totalItems}
        />
      </Modal>
    </SafeAreaView>
  );
};

export default memo(CollectAggregatedQRCodeScreen);
