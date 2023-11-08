import {
  View,
  Platform,
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { memo, FC, useRef, useState, useEffect } from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { messages } from "../lib/dataForChat";
import ChatCardHeader from "../components/global/ChatCardHeader";
import ChatSingleMessage from "../components/global/ChatSingleMessage";
import ChartSendMessage from "../components/global/ChartSendMessage";
import { useShowNavigationHeader } from "../hooks/useShowNavigationHeader";
import { ROUTES } from "../navigation/NavigationTypes";
import { ColorSchema } from "../enums/colorSchema";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { resetTriggerChat } from "../redux/storers/storerTriggerChat/storerTriggerChat.slice";

const CreatorChatRoomScreen: FC = () => {
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
    headerColor: ColorSchema.CREATOR_COLOR,
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
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <KeyboardAvoidingView
        className="flex-1 bg-01-blue-mission"
        behavior={isIos ? "padding" : "height"}
        keyboardVerticalOffset={100}
      >
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          style={StyleSheet.absoluteFillObject}
          className="bg-01-blue-mission"
        >
          <>
            {/* Chat modal header */}
            <ChatCardHeader
              name={room?.name}
              avatar={room?.icon}
              signature={room?.company ? room.company : room?.address}
              headerBackground="#4B6465"
            />
            <ScrollView
              className="flex-1 p-0 bg-01-blue-mission"
              scrollEnabled
              ref={chatRef}
              onLayout={() => chatRef?.current?.scrollToEnd({ animated: true })}
            >
              <View className="flex-1 p-4 bg-[#92CDD0]">
                {chatMessages.map((message) => (
                  <ChatSingleMessage
                    key={message.timestamp}
                    message={message}
                    icon={room?.icon}
                    backgroundColor={ColorSchema.CREATOR_COLOR_ICON}
                  />
                ))}
              </View>
            </ScrollView>

            <View className="bg-[#92CDD0] p-4">
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

export default memo(CreatorChatRoomScreen);
