import { View, Text } from "react-native";
import { FC, memo, ReactElement } from "react";
import moment from "moment";

type Props = {
  message: Message;
  icon: ReactElement<any, any>;
  backgroundColor: string;
};

const ChatSingleMessage: FC<Props> = ({ message, icon, backgroundColor }) => {
  return (
    <View className="flex flex-row items-end mb-3">
      <View className={!message.isSender ? "flex-1" : "flex"}>
        {message.isSender ? icon : <View className="w-[15px]" />}
      </View>

      <View className="flex flex-col">
        <Text
          style={{
            fontFamily: "Nunito",
            marginLeft: message.isSender ? 15 : 0,
            textAlign: !message.isSender ? "right" : "left",
            marginRight: message.isSender ? 0 : 10,
          }}
          className="text-[12px] leading-[20px] font-normal text-[#BBBBBB]"
        >
          {moment(message.timestamp).format("ddd, HH:mm")}
        </Text>

        <View
          className={
            message.isSender
              ? "flex flex-row justify-start max-w-[260px] p-4 rounded-[20px] ml-3"
              : "flex flex-row justify-end max-w-[260px] p-4 rounded-[20px]"
          }
          style={{
            backgroundColor: message.isSender ? "#F7F7F7" : "#101828",
          }}
        >
          <Text
            style={{
              fontFamily: "Nunito",
              color: message.isSender ? "#454545" : "#FFFFFF",
            }}
            className="text-[14px] leading-[20px] font-normal"
          >
            {message.message}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default memo(ChatSingleMessage);
