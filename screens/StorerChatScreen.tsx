import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { memo, FC, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "components/header/BackButton";
import HeaderTitle from "components/header/HeaderTitle";
import { useShowNavigationHeader } from "../hooks/useShowNavigationHeader";
import { RootStackParamList, ROUTES } from "../navigation/NavigationTypes";
import SearchInput from "../components/global/SearchInput";
import { Role } from "../enums/roleType";
import StorageChatTab from "../components/verify-storage/StorageChatTab";
import { collectorUsers, creatorUsers } from "../lib/dataForChat";
import ChatCard from "../components/global/ChatCard";
import { useAppDispatch } from "../redux/hooks";
import { triggerChat } from "../redux/storers/storerTriggerChat/storerTriggerChat.slice";
import Title from "../components/global/Title";
import { ColorSchema } from "../enums/colorSchema";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  ROUTES.VERIFY_AND_STORAGE_CHAT
>;

const StorerChatScreen: FC = () => {
  const isIos = Platform.OS === "ios" || Platform.OS === "macos";

  const navigate = useNavigation<NavigationProp>();

  const [search, setSearch] = useState<string>("");
  const [role, setRole] = useState<Role>(Role.CREATOR);

  const dispatch = useAppDispatch();

  /* Show navigation header */
  useShowNavigationHeader({
    headerColor: ColorSchema.STORER_COLOR,
    isBackVisible: true,
    isTitleVisible: true,
    navigateToHome: ROUTES.HOME,
  });

  const searched = (keyword: string) => (c: Chat) => c?.name?.includes(keyword);

  const handleOpenModal = (clickedModal: Chat) => {
    dispatch(triggerChat({ success: true }));
    navigate.navigate(ROUTES.VERIFY_AND_STORAGE_CHAT_ROOM, {
      room: clickedModal,
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-03-green-mission">
      <View className="flex flex-row justify-between h-12 items-center px-8">
        <BackButton />
        <HeaderTitle navigateToHome={ROUTES.HOME} bigIcon />
        <View className="w-6" />
      </View>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={isIos ? "padding" : "height"}
        keyboardVerticalOffset={100}
      >
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          style={StyleSheet.absoluteFillObject}
        >
          <View className="flex-1 ">
            <ScrollView className="flex-1 bg-[#101828]/[0.5] p-0 mt-3">
              <View className="flex-1  p-4 -mt-2">
                <Title title="Chat" textColor="#FFFFFF" />

                {/* Search component */}
                <View className="mt-4">
                  <SearchInput setValue={setSearch} value={search} />
                </View>

                {/* Chat Tab */}
                <View className="mt-8">
                  <StorageChatTab role={role} setRole={setRole} />
                </View>

                {/* Chat result cards for creators */}
                {role === Role.CREATOR ? (
                  <View className="mt-6">
                    {creatorUsers.filter(searched(search)).map((creator) => (
                      <TouchableOpacity
                        key={creator.id}
                        onPress={() => handleOpenModal(creator)}
                      >
                        <ChatCard
                          item={creator}
                          backgroundColor="#00B0AD4D"
                          subtitleColor={ColorSchema.STORER_COLOR_ICON}
                          chipColor={ColorSchema.STORER_COLOR_ICON}
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                ) : null}

                {/* Chat result cards for collectors */}
                {role === Role.COLLECTOR ? (
                  <View className="mt-6">
                    {collectorUsers
                      .filter(searched(search))
                      .map((collector) => (
                        <TouchableOpacity
                          key={collector.id}
                          onPress={() => handleOpenModal(collector)}
                        >
                          <ChatCard
                            item={collector}
                            backgroundColor="#00B0AD4D"
                            subtitleColor={ColorSchema.STORER_COLOR_ICON}
                            chipColor={ColorSchema.STORER_COLOR_ICON}
                          />
                        </TouchableOpacity>
                      ))}
                  </View>
                ) : null}
              </View>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default memo(StorerChatScreen);
