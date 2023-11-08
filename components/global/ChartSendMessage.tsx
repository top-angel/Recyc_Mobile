import { memo, FC, useState, useCallback } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { useAppDispatch } from "redux/hooks";
import { triggerChat } from "redux/storers/storerTriggerChat/storerTriggerChat.slice";
import SendIcon from "../icons/SendIcon";

type Props = {
  messages: Message[];
  setMessages: (arg: Message[]) => void;
};

const ChartSendMessage: FC<Props> = ({ messages, setMessages }) => {
  const [text, setText] = useState<string>("");

  const dispatch = useAppDispatch();

  const handleMessage = useCallback(() => {
    const list: Message[] = [...messages];
    const listObject: Message = {
      message: text,
      isSender: false,
      timestamp: Date.now(),
    };
    list.push(listObject);
    setMessages(list);
    dispatch(triggerChat({ success: true }));
    setText("");
  }, [messages, setMessages, text, dispatch]);

  return (
    <View className="flex flex-row items-center bg-[#FFFFFF] rounded-[20px] px-4 py-2">
      <TextInput
        style={{ fontFamily: "Nunito", width: "90%" }}
        placeholder="Type something"
        keyboardType="default"
        value={text}
        placeholderTextColor="#BBBBBB"
        onChangeText={(newText) => setText(newText)}
        className="bg-white text-[14px] leading-[20px] text-[#1E5355] font-normal"
      />
      <TouchableOpacity onPress={handleMessage}>
        <SendIcon />
      </TouchableOpacity>
    </View>
  );
};

export default memo(ChartSendMessage);
