import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { memo, FC, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import BackButton from "components/header/BackButton";
import HeaderTitle from "components/header/HeaderTitle";
import { useShowNavigationHeader } from "../hooks/useShowNavigationHeader";
import { RootStackParamList, ROUTES } from "../navigation/NavigationTypes";
import { useAppDispatch } from "../redux/hooks";
import Title from "../components/global/Title";
import SearchInput from "../components/global/SearchInput";
import { collectorUsers } from "../lib/dataForChat";
import ChatCard from "../components/global/ChatCard";
import { triggerChat } from "../redux/storers/storerTriggerChat/storerTriggerChat.slice";
import { ColorSchema } from "../enums/colorSchema";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  ROUTES.COLLECT_MISSION_CHAT
>;

const CollectorChatScreen: FC = () => {
  const navigate = useNavigation<NavigationProp>();

  const [search, setSearch] = useState<string>("");

  const dispatch = useAppDispatch();

  const searched = (keyword: string) => (c: Chat) => c?.name?.toLowerCase().includes(keyword.toLowerCase());
  /* Show navigation header */
  useShowNavigationHeader({
    headerColor: ColorSchema.COLLECTOR_COLOR,
    isBackVisible: true,
    isTitleVisible: true,
    navigateToHome: ROUTES.HOME,
  });

  const handleRedirect = (clickedModal: Chat) => {
    dispatch(triggerChat({ success: true }));
    navigate.navigate(ROUTES.COLLECT_MISSION_CHAT_ROOM, {
      room: clickedModal,
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-02-purple-mission">
      <View className="flex flex-row justify-between h-12 items-center px-8">
        <BackButton />
        <HeaderTitle navigateToHome={ROUTES.HOME} bigIcon />
        <View className="w-6" />
      </View>
      <View className="flex-1 mt-3 bg-01-creator-background-dark-color/[0.5]">
        <ScrollView className="flex-1 p-0 ">
          <View className="flex-1 z-20 p-4">
            <View className="mt-2">
              <Title title="Chat with Storers" textColor="white" />
            </View>

            <View
              className="w-full mt-4 bg-white rounded-[20px]"
              style={{
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            >
              <SearchInput value={search} setValue={setSearch} />
            </View>

            <View className="mt-6">
              {collectorUsers.filter(searched(search)).map((collector) => (
                <TouchableOpacity
                  key={collector.id}
                  onPress={() => handleRedirect(collector)}
                >
                  <ChatCard
                    item={collector}
                    backgroundColor={ColorSchema.COLLECTOR_COLOR}
                    subtitleColor="#E3EAEF"
                    chipColor={ColorSchema.TEXTINPUT_COLOR}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default memo(CollectorChatScreen);
