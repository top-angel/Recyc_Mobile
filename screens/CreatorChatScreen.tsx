import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { memo, FC, useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import SingleMissionImageHeader from "../components/createdMissions/SingleMissionImageHeader";
import Title from "../components/global/Title";
import SearchInput from "../components/global/SearchInput";
import { collectorUsers } from "../lib/dataForChat";
import { useAppDispatch } from "../redux/hooks";
import { triggerChat } from "../redux/storers/storerTriggerChat/storerTriggerChat.slice";
import { RootStackParamList, ROUTES } from "../navigation/NavigationTypes";
import ChatCard from "../components/global/ChatCard";
import { useRenderOptionalHeader } from "../hooks/missions/useRenderOptionalHeader";
import { ColorSchema } from "../enums/colorSchema";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  ROUTES.CREATE_MISSION_CHAT
>;

const CreatorChatScreen: FC = () => {
  const navigate = useNavigation<NavigationProp>();
  const route =
    useRoute<RouteProp<{ params: { data: { isWithImage: boolean } } }>>();

  const { data } = route.params;

  /** RENDER OPTIONAL HEADER */
  useRenderOptionalHeader({ isWithImage: data.isWithImage });

  const [search, setSearch] = useState<string>("");

  const dispatch = useAppDispatch();

  const searched = (keyword: string) => (c: Chat) => c?.name?.includes(keyword);

  const handleOpenModal = (clickedModal: Chat) => {
    dispatch(triggerChat({ success: true }));
    navigate.navigate(ROUTES.CREATE_MISSION_CHAT_ROOM, {
      room: clickedModal,
    });
  };

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <View className="flex-1 bg-01-blue-mission">
        <ScrollView className="flex-1 p-0 bg-white rounded-t-[20px]">
          {data?.isWithImage ? <SingleMissionImageHeader /> : null}

          <View
            className="flex-1 bg-white rounded-t-[20px] z-20 p-4"
            style={{ marginTop: data?.isWithImage ? -7 : 0 }}
          >
            <View className={data?.isWithImage ? "mt-0" : "mt-6"}>
              <Title title="Chat" textColor={ColorSchema.CREATOR_COLOR_ICON} />
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
              {collectorUsers.filter(searched(search)).map((creator) => (
                <TouchableOpacity
                  key={creator.id}
                  onPress={() => handleOpenModal(creator)}
                >
                  <ChatCard
                    item={creator}
                    backgroundColor="#86B6B9"
                    subtitleColor="#394E50"
                    chipColor="#394E50"
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

export default memo(CreatorChatScreen);
