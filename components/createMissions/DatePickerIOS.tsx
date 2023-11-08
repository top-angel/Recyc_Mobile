import { View } from "react-native";
import { memo, FC } from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

type Props = {
  handlePressDate: (event: DateTimePickerEvent, selectedDate?: Date) => void;
  date: Date;
};

const DatePickerIOS: FC<Props> = ({ handlePressDate, date }) => {
  return (
    <View className="flex-row items-center mt-2">
      <DateTimePicker
        testID="datePicker1"
        value={date}
        mode="date"
        themeVariant="light"
        is24Hour
        style={{
          backgroundColor: "#D3ECED",
        }}
        onChange={handlePressDate}
      />
    </View>
  );
};

export default memo(DatePickerIOS);
