import { View, Text, TouchableOpacity } from "react-native";
import { memo, FC, useMemo } from "react";

type Props = {
  setModalVisible: (arg: boolean) => void;
  approvedItems: number;
  totalItems: number;
};

const ModalEndMission: FC<Props> = ({
  setModalVisible,
  approvedItems,
  totalItems,
}) => {
  const percent = useMemo(
    () => Math.round(approvedItems / totalItems),
    [approvedItems, totalItems],
  );

  return (
    <View className="flex-1 justify-end">
      <View className="bg-[#C7DEFC] rounded-t-[20px] p-5">
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[18px] leading-[36px] text-[#425D7E] font-bold text-center"
        >
          Are you sure you want to end the mission?
        </Text>

        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[16px] leading-[36px] text-[#425D7E] font-light text-center"
        >
          Set amount of Items have not been reached
        </Text>

        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[14px] leading-[20px] font-normal text-[#425D7E] mt-6"
        >
          {approvedItems}/{totalItems}
        </Text>

        <View className="w-full flex flex-row items-center my-4 rounded-[15px] bg-">
          <View
            className="h-[10px] bg-[#425D7E] rounded-l-[15px]"
            style={{
              width: `${percent}%`,
              borderTopRightRadius: percent === 100 ? 15 : 0,
              borderBottomRightRadius: percent === 100 ? 15 : 0,
            }}
          />
          <View
            className="h-[10px] bg-[#FFFFFF] rounded-r-[15px]"
            style={{
              width: `${100 - percent}%`,
              borderTopLeftRadius: percent === 0 ? 15 : 0,
              borderBottomLeftRadius: percent === 0 ? 15 : 0,
            }}
          />
        </View>

        <TouchableOpacity onPress={() => setModalVisible(false)}>
          <View className="border border-[#425D7E] rounded-[12px] p-4">
            <Text
              style={{ fontFamily: "Nunito" }}
              className="text-[18px] leading-[23px] font-bold text-[#425D7E] text-center"
            >
              End Mission
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          className="mt-4"
          onPress={() => setModalVisible(false)}
        >
          <View className="bg-[#425D7E] rounded-[12px] p-4">
            <Text
              style={{ fontFamily: "Nunito" }}
              className="text-[18px] leading-[23px] font-bold text-[#FFFFFF] text-center"
            >
              Cancel
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(ModalEndMission);
