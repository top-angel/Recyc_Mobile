import { View, Text, TouchableOpacity } from "react-native";
import { memo, FC } from "react";
import moment from "moment";

type Props = {
  handlePressDate: (arg: boolean) => void;
  dateChanged: boolean;
  date: Date;
  showItem: boolean;
};

const DatePickerAndroid: FC<Props> = ({
  handlePressDate,
  dateChanged,
  date,
  showItem,
}) => {
  return (
    <TouchableOpacity onPress={() => handlePressDate(!showItem)}>
      <View className="flex-row w-[90%] rounded-[12px] bg-01-creator-light-secondary p-4 items-center justify-between">
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[14px] leading-[20px] font-normal text-[#394E50]"
        >
          {dateChanged ? moment(date).format("DD.MM.YYYY") : "DD/MM/YYYY"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(DatePickerAndroid);
