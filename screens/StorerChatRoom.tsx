import {
  View,
  Platform,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { memo, FC, useState, useRef, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, RouteProp } from "@react-navigation/native";
import BackButton from "components/header/BackButton";
import HeaderTitle from "components/header/HeaderTitle";
import { ROUTES } from "../navigation/NavigationTypes";
import { useShowNavigationHeader } from "../hooks/useShowNavigationHeader";
import ChatCardHeader from "../components/global/ChatCardHeader";
import { messages } from "../lib/dataForChat";
import ChatSingleMessage from "../components/global/ChatSingleMessage";
import ChartSendMessage from "../components/global/ChartSendMessage";
import { ColorSchema } from "../enums/colorSchema";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { resetTriggerChat } from "../redux/storers/storerTriggerChat/storerTriggerChat.slice";

const StorerChatRoom: FC = () => {
  const route = useRoute<RouteProp<{ params: { room: Chat } }>>();
  const { room } = route.params;

  const isIos = Platform.OS === "ios" || Platform.OS === "macos";

  const chatRef = useRef(null);

  const [chatMessages, setChatMessages] = useState<Message[]>(messages);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const { success } = useAppSelector((state) => state.storerTriggerChat);
  const dispatch = useAppDispatch();

  /* Show navigation header */
  useShowNavigationHeader({
    headerColor: ColorSchema.STORER_COLOR,
    isBackVisible: true,
    isTitleVisible: true,
    navigateToHome: ROUTES.HOME,
  });

  useEffect(() => {
    if (success) {
      setIsScrolled(true);
      chatRef?.current?.scrollToEnd({ animated: true });
      dispatch(resetTriggerChat());
      setIsScrolled(false);
    }
  }, [isScrolled, chatRef, success, dispatch, chatMessages]);

  return (
    <SafeAreaView className="flex-1 bg-03-green-mission">
      <View className="flex flex-row justify-between h-12 items-center px-8">
        <BackButton />
        <HeaderTitle navigateToHome={ROUTES.HOME} bigIcon />
        <View className="w-6" />
      </View>
      <KeyboardAvoidingView
        className="flex-1 mt-3"
        behavior={isIos ? "padding" : "height"}
        keyboardVerticalOffset={100}
      >
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          style={StyleSheet.absoluteFillObject}
        >
          <>
            <ChatCardHeader
              name={room?.name}
              avatar={room?.icon}
              signature={room?.company ? room.company : room?.address}
              headerBackground="#10182840"
            />
            <ScrollView
              className="flex-1 p-0"
              scrollEnabled
              ref={chatRef}
              onLayout={() => chatRef?.current?.scrollToEnd({ animated: true })}
            >
              <View className="flex-1 p-4 bg-[#10182880]">
                {chatMessages.map((message) => (
                  <ChatSingleMessage
                    key={message.timestamp}
                    message={message}
                    icon={room?.icon}
                    backgroundColor="#55C0C3"
                  />
                ))}
              </View>
            </ScrollView>

            <View className="bg-[#10182880] p-4">
              <ChartSendMessage
                messages={chatMessages}
                setMessages={setChatMessages}
              />
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default memo(StorerChatRoom);
