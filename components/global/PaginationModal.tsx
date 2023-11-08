import { memo, FC } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface IProps {
  setModalVisible: (arg: boolean) => void;
  perPage: number;
  setPerPage: (arg: number) => void;
}

const PaginationModal: FC<IProps> = ({
  setModalVisible,
  perPage,
  setPerPage,
}) => (
  <View className="flex-1 justify-end">
    <View className="bg-[#CFD2D8] rounded-t-[20px] p-5">
      <Picker
        style={{
          color: "#FFFFFF",
          fontFamily: "Nunito",
          width: 85,
          marginRight: 0,
          fontSize: 4,
        }}
        dropdownIconColor="#C8DAE8"
        selectedValue={perPage || 10}
        onValueChange={(value) => setPerPage(value)}
      >
        <Picker.Item value={10} label="10" />
        <Picker.Item value={20} label="20" />
      </Picker>

      <TouchableOpacity onPress={() => setModalVisible(false)}>
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[17px] leading-[24px] font-bold text-[#3F7D20] text-center mt-2 mb-2"
        >
          Close
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default memo(PaginationModal);
