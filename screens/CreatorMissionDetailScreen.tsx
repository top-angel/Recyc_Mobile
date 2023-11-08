import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Modal,
} from "react-native";
import { memo, FC, useState } from "react";
import SingleMissionImageHeader from "../components/createdMissions/SingleMissionImageHeader";
import { useSetMissionById } from "../hooks/missions/useSetMissionById";
import { CreatorDoc } from "../redux/creators/creators.types";
import MissionUpdateInputFields from "../components/missions/MissionUpdateInputFields";
import MissionUpdateButtons from "../components/missions/MissionUpdateButtons";
import ModalEndMission from "../components/missions/ModalEndMission";
import { useAppSelector } from "../redux/hooks";

const CreatorMissionDetailScreen: FC = () => {
  const isIos = Platform.OS === "ios" || Platform.OS === "macos";

  const [bounty, setBounty] = useState<BountyUpdate>({
    missionTitle: "",
    missionDescription: "",
    companyTitle: "",
    totalRewards: 0,
  });
  const [isWorldwide, setIsWorldwide] = useState<boolean>(true);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const { result } = useAppSelector((state) => state.missionGetById);

  /** SET VALUES ON LOAD */
  useSetMissionById({
    setBounty,
  });

  const handleUpdate = (key: keyof CreatorDoc) => (text: string) => {
    setBounty({
      ...bounty,
      [key]: text,
    });
  };

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={isIos ? "padding" : "height"}
        keyboardVerticalOffset={100}
      >
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          style={StyleSheet.absoluteFillObject}
        >
          <>
            <ScrollView className="flex-1 p-0 bg-white">
              <SingleMissionImageHeader />

              <MissionUpdateInputFields
                bounty={bounty}
                handleUpdate={handleUpdate}
                isWorldwide={isWorldwide}
                setIsWorldwide={setIsWorldwide}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
              />
            </ScrollView>
            <MissionUpdateButtons setModalVisible={setModalVisible} />

            <Modal
              transparent
              animationType="slide"
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <ModalEndMission
                setModalVisible={setModalVisible}
                approvedItems={result[0]?.accepted_entity_count}
                totalItems={result[0]?.image_count}
              />
            </Modal>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default memo(CreatorMissionDetailScreen);
