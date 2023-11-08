import { memo, FC } from "react";
import { TextInput, View } from "react-native";
import SearchIcon from "../icons/SearchIcon";

type Props = {
  value: string;
  setValue: (arg: string) => void;
};

const SearchInput: FC<Props> = ({ value, setValue }) => {
  return (
    <View className="flex flex-row w-full items-center bg-white rounded-[12px] py-2 px-4">
      <SearchIcon style={{ width: 20, height: 21, color: "#BBBBBB" }} />
      <TextInput
        style={{ fontFamily: "Nunito", width: "90%" }}
        placeholder="Search"
        keyboardType="default"
        value={value}
        placeholderTextColor="#BBBBBB"
        onChangeText={(text) => setValue(text)}
        className="bg-white text-[14px] leading-[20px] text-[#BBBBBB] font-normal ml-2"
      />
    </View>
  );
};

export default memo(SearchInput);
