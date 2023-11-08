import { useState, memo, FC } from "react";
import { View, Text, Platform, Modal, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import BackIcon from "../icons/ArrowBackIcon";
import ForwardIcon from "../icons/ArrowRightIcon";
import PaginationModal from "./PaginationModal";

interface IProps {
  page: number;
  setPage: (arg: number) => void;
  perPage: number;
  setPerPage: (arg: number) => void;
  total: number;
  primaryColor: string;
  secondaryColor: string;
}

const Pagination: FC<IProps> = ({
  page,
  setPage,
  perPage,
  setPerPage,
  total,
  primaryColor,
  secondaryColor,
}) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const isIos = Platform.OS === "ios" || Platform.OS === "macos";

  const isLastPage = (page + 1) * perPage >= total;

  return (
    <View className="mt-2 mb-6 ml-2 mr-2">
      <View className="flex-row items-center justify-between">
        {!isIos ? (
          <View className="flex-row items-center justify-between mt-2 mb-2">
            <Text
              style={{ fontFamily: "Nunito", color: primaryColor }}
              className="font-light text-[14px] leading-[30px] mr-4"
            >
              Rows per page:
            </Text>

            <View
              className="w-30 rounded-[10px] border"
              style={{ borderColor: primaryColor }}
            >
              <Picker
                style={{
                  color: primaryColor,
                  width: 65,
                  fontSize: 3,
                }}
                dropdownIconColor={primaryColor}
                selectedValue={perPage || 10}
                onValueChange={(value) => setPerPage(value)}
              >
                <Picker.Item value={5} label="5" />
                <Picker.Item value={10} label="10" />
                <Picker.Item value={20} label="20" />
              </Picker>
            </View>
          </View>
        ) : null}

        {isIos ? (
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <View className="flex-row items-center justify-between mt-2 mb-2">
              <Text
                style={{ fontFamily: "Nunito", color: primaryColor }}
                className="font-light text-[14px] leading-[30px]"
              >
                Rows per page:
              </Text>
              <View className="w-30 border border-01-creator-dark-secondary p-1 pl-2 pr-2 ml-3 rounded-[5px]">
                <Text
                  style={{ fontFamily: "Nunito", color: primaryColor }}
                  className="font-light text-[12px] leading-[19px]"
                >
                  {perPage}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ) : null}

        <View className="flex-row items-center mx-2">
          <TouchableOpacity
            onPress={() => setPage(page - 1)}
            disabled={page === 0}
          >
            <View className="mr-5">
              <BackIcon
                style={{
                  width: 20,
                  height: 20,
                  color: `${page === 0 ? secondaryColor : primaryColor}`,
                }}
              />
            </View>
          </TouchableOpacity>

          <Text
            style={{ fontFamily: "Nunito", color: primaryColor }}
            className="font-light text-[14px] leading-[30px] mr-3"
          >
            {page * perPage + 1}-
            {(page + 1) * perPage > total ? total : (page + 1) * perPage} of{" "}
            {total}
          </Text>

          <TouchableOpacity
            onPress={() => setPage(page + 1)}
            disabled={(page + 1) * perPage >= total}
          >
            <ForwardIcon
              style={{
                width: 20,
                height: 20,
                color: `${isLastPage ? secondaryColor : primaryColor}`,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal */}
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        transparent
      >
        <PaginationModal
          setModalVisible={setModalVisible}
          perPage={perPage}
          setPerPage={setPerPage}
        />
      </Modal>
    </View>
  );
};

export default memo(Pagination);
