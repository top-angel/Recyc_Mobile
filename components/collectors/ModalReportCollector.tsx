import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { memo, FC, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchIcon from "components/icons/SearchIcon";

type Props = {
  setModalVisible: (arg: boolean) => void;
};

const ModalReportCollector: FC<Props> = ({ setModalVisible }) => {
  const [storerName, setStorerName] = useState<string>("");
  const [reportDescription, setReportDescription] = useState<string>("");
  const [successModal, setSuccessModal] = useState<boolean>(false);

  const onClickBack = () => {
    setModalVisible(false);
    setSuccessModal(false);
  };

  const onClickReport = () => {
    if (storerName === "") {
      alert("Please input storer name");
    } else if (reportDescription === "") {
      alert("Please input report description");
    } else {
      setSuccessModal(true);
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-end bg-[#101828]/[0.8]">
      {!successModal ? (
        <TouchableWithoutFeedback
          className="flex"
          onPress={() => Keyboard.dismiss()}
        >
          <View
            className="bg-[#1E5355] rounded-t-[12px] p-5"
            style={{
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <View className="flex flex-col items-center mt-2 mb-4">
              <Text
                style={{ fontFamily: "Nunito" }}
                className="text-[18px] leading-[20px] font-bold text-white"
              >
                Report a Collector
              </Text>
            </View>

            <View className="flex flex-col mt-1 mb-6 ">
              <Text
                style={{ fontFamily: "Nunito" }}
                className="text-[14px] font-medium text-white mb-2"
              >
                Collector Name
              </Text>
              <View className="flex flex-row  px-3 py-1 items-center bg-white rounded-xl mt-1">
                <SearchIcon
                  style={{
                    width: 24,
                    height: 24,
                    color: "rgba(46, 98, 151, 0.3)",
                  }}
                />
                <TextInput
                  style={{ fontFamily: "Nunito", flex: 1 }}
                  placeholder="Search"
                  keyboardType="default"
                  value={storerName}
                  onChangeText={(text) => setStorerName(text)}
                  placeholderTextColor="rgba(46, 98, 151, 0.3)"
                  className="p-1 text-[14px] leading-[20px] text-01-creator-dark font-medium ml-2"
                />
              </View>
            </View>

            <View className="flex flex-col mb-6">
              <Text
                style={{ fontFamily: "Nunito" }}
                className="text-[14px] font-medium text-white mb-2"
              >
                Report Description
              </Text>
              <TextInput
                style={{
                  fontFamily: "Nunito",
                  width: "100%",
                  height: 120,
                  textAlignVertical: "top",
                }}
                placeholder="e.g. Vulgar language, Fraud...etc"
                keyboardType="default"
                multiline
                placeholderTextColor="rgba(46, 98, 151, 0.3)"
                value={reportDescription}
                onChangeText={(text) => setReportDescription(text)}
                className="p-4 bg-white rounded-[12px] text-[14px] leading-[20px] text-01-creator-dark font-medium"
              />
            </View>

            <View className="flex flex-row items-center justify-between">
              <TouchableOpacity
                className="rounded-[14px] py-4 px-6  my-1 border-2 border-[#00B0AD]"
                onPress={onClickBack}
              >
                <Text
                  style={{ fontFamily: "Nunito" }}
                  className="text-[18px] leading-[20px] font-bold text-white text-center"
                >
                  Back
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 bg-[#00B0AD] rounded-[14px] p-4 my-1 ml-6 "
                onPress={onClickReport}
              >
                <Text
                  style={{ fontFamily: "Nunito" }}
                  className="text-[18px] leading-[20px] font-bold text-white text-center"
                >
                  Report
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <View
          className="bg-[#1E5355] rounded-t-[12px] p-5"
          style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <View className="flex flex-col items-center mt-3 mb-4">
            <Text
              style={{ fontFamily: "Nunito" }}
              className="text-[18px] leading-[20px] font-bold text-white"
            >
              Collector Successfully Reported
            </Text>
          </View>
          <TouchableOpacity
            className="flex bg-[#00B0AD] rounded-[14px] p-4 my-3"
            onPress={onClickBack}
          >
            <Text
              style={{ fontFamily: "Nunito" }}
              className="text-[18px] leading-[20px] font-bold text-white text-center"
            >
              Back
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default memo(ModalReportCollector);
