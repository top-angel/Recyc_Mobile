import { View, Text, TouchableOpacity } from "react-native";
import { memo, FC } from "react";
import { Role } from "enums/roleType";

type Props = {
  role: Role;
  setRole: (arg: Role) => void;
};

const StorageChatTab: FC<Props> = ({ role, setRole }) => {
  return (
    <View className="flex flex-row items-center w-full rounded-[12px]justify-between p-1">
      <TouchableOpacity
        onPress={() => setRole(Role.CREATOR)}
        className="w-[49%] shadow-sm shadow-slate-100"
      >
        <View
          style={{
            backgroundColor: role === Role.CREATOR ? "#00B0AD" : null,
          }}
          className="p-2 rounded-[12px]"
        >
          <Text
            style={{
              fontFamily: "Nunito",
              color: "white",
              fontWeight: role === Role.CREATOR ? "700" : "400",
            }}
            className="text-[14px] leading-[20px] font-normal text-center"
          >
            Mission Creators
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setRole(Role.COLLECTOR)}
        className="w-[49%]"
      >
        <View
          style={{
            backgroundColor: role === Role.COLLECTOR ? "#00B0AD" : null,
          }}
          className="p-2 rounded-[12px]"
        >
          <Text
            style={{
              fontFamily: "Nunito",
              color: "white",
            }}
            className="text-[14px] leading-[20px] font-normal text-center"
          >
            Collectors
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default memo(StorageChatTab);
