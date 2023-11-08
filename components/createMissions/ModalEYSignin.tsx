import { View, Text, TouchableOpacity } from "react-native";
import { memo, FC } from "react";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import EYIcon from "../icons/EYIcon";

type Props = {
  onClose: (arg: boolean) => void;
  username: string;
  setUsername: (arg: string) => void;
};

const ModalEYSignin: FC<Props> = ({ onClose, setUsername, username }) => {
  return (
    <View className="flex-1 bg-01-blue-mission">
      <View className="bg-[#425D7E] p-6 flex flex-row items-center justify-between rounded-t-[12px]">
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[#FFFFFF] text-[18px] leading-[23px] font-normal"
        >
          Sign in to E&Y
        </Text>
        <TouchableOpacity onPress={() => onClose(false)}>
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View className="flex-1 justify-center items-center">
        <EYIcon style={{ width: 64, height: 64 }} />
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[#FFFFFF] text-[24px] leading-[30px] font-normal mt-6"
        >
          Sign in
        </Text>

        <View className="w-[80%] bg-transparent">
          <Text
            style={{ fontFamily: "Nunito" }}
            className={
              username
                ? "text-[15px] leading-[24px] text-[#FFF] font-semibold text-08-gray transition ease-in-out duration-700"
                : "text-[15px] leading-[24px] text-[#FFF] font-semibold text-08-gray translate-y-10 opacity-0 transition ease-in-out duration-700"
            }
          >
            Email address
          </Text>
          <TextInput
            style={{ fontFamily: "Nunito" }}
            placeholder="Email address"
            keyboardType="email-address"
            value={username}
            placeholderTextColor="#FFFFFF"
            onChangeText={setUsername}
            className="w-full p-3 pl-0 border-b border-[#425D7E] bg-transparent text-[19px] leading-[24px] text-[#FFFFFF] font-light"
          />
        </View>

        <TouchableOpacity
          className="w-[80%] mt-4"
          onPress={() => onClose(false)}
        >
          <View className="bg-[#425D7E] justify-center items-center p-3 rounded-[12px]">
            <Text
              style={{ fontFamily: "Nunito" }}
              className="text-[#FFFFFF] text-[24px] leading-[30px] font-normal"
            >
              Next
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(ModalEYSignin);
