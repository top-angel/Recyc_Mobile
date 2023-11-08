import { TouchableOpacity, View } from "react-native";
import { memo, FC } from "react";

type Props = {
  value: boolean;
  setValue: (arg: boolean) => void;
  color: string;
};

const CheckboxOption: FC<Props> = ({ value, setValue, color }) => {
  return (
    <TouchableOpacity onPress={() => setValue(!value)}>
      {value ? (
        <View
          className={`flex w-5 h-5 rounded-[20px] border-[5px] ${color} bg-white`}
        />
      ) : (
        <View className="flex w-5 h-5 rounded-full bg-white" />
      )}
    </TouchableOpacity>
  );
};

export default memo(CheckboxOption);
