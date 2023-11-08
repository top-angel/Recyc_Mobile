import {
  View,
  Text,
  TextInput,
  Dimensions,
  Modal,
  Platform,
  TouchableOpacity,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { FC, memo, useCallback, useMemo, useState } from "react";
import Slider from "@react-native-community/slider";
import numeral from "numeral";
import CheckboxOption from "components/global/CheckboxOption";
import { ColorSchema } from "enums/colorSchema";
import { CreatorDoc } from "../../redux/creators/creators.types";
import Subtitle from "../global/Subtitle";
import CreatorImagePicker from "./CreatorImagePicker";
import ModalEYSignin from "./ModalEYSignin";
import DatePickerAndroid from "./DatePickerAndroid";
import DatePickerIOS from "./DatePickerIOS";
import WorldwideSwitch from "../global/WorldwideSwitch";

type Props = {
  bounty: Bounty;
  itemsCount: number;
  setItemsCount: (arg: number) => void;
  handleChange: (key: keyof CreatorDoc) => (text: string) => void;
  image: string;
  setImage: (arg: string) => void;
  accessToken: string;
  startDate: Date;
  setStartDate: (arg: Date) => void;
  endDate: Date;
  setEndDate: (arg: Date) => void;
  setFormDataFile: (arg: FormDataFile) => void;
  setIsTerms: (arg: boolean) => void;
};

const CreateMissionInputFields: FC<Props> = ({
  bounty,
  handleChange,
  itemsCount,
  setItemsCount,
  image,
  setImage,
  accessToken,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  setFormDataFile,
  setIsTerms,
}) => {
  const isIos = Platform.OS === "ios" || Platform.OS === "macos";
  const { width } = Dimensions.get("screen");

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [showStart, setShowStart] = useState<boolean>(false);
  const [startChanged, setStartChanged] = useState<boolean>(false);
  const [showEnd, setShowEnd] = useState<boolean>(false);
  const [endChanged, setEndChanged] = useState<boolean>(false);
  const [isWorldwide, setIsWorldwide] = useState<boolean>(true);
  const [isTermsagree, setIsTermsagree] = useState<boolean>(false);

  const left = useMemo(
    () => (itemsCount * (width - 60)) / 1000000 - 35,
    [itemsCount, width],
  );

  const handlePressStartDate = useCallback(() => {
    setShowStart(!showStart);
  }, [showStart]);

  const handlePressEndDate = useCallback(() => {
    setShowEnd(!showEnd);
  }, [showEnd]);

  const onChangeStart = useCallback(
    (event: DateTimePickerEvent, selectedDate?: Date) => {
      const currentDate = selectedDate;
      setShowStart(false);
      setStartDate(currentDate);
      setStartChanged(true);
    },
    [setStartDate],
  );

  const onChangeEnd = useCallback(
    (event: DateTimePickerEvent, selectedDate?: Date) => {
      const currentDate = selectedDate;
      setShowEnd(false);
      setEndDate(currentDate);
      setEndChanged(true);
    },
    [setEndDate],
  );

  return (
    <View className="mt-4">
      <View className="mt-2 mb-6 p-4 bg-02-purple-mission rounded-xl">
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[16px] text-white leading-[20px] font-bold"
        >
          Profile Image
        </Text>
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[14px] text-white leading-[20px] font-medium mt-1 mb-3"
        >
          Upload a profile image to give a better impression to storers and
          collectors
        </Text>
        <CreatorImagePicker
          image={image}
          setImage={setImage}
          accessToken={accessToken}
          setFormDataFile={setFormDataFile}
        />
      </View>

      <Subtitle title="Company Name" textColor="#FFFFFF" />
      <View className="mt-2 mb-6">
        <TextInput
          style={{
            fontFamily: "Nunito",
            width: "100%",
            color: ColorSchema.TEXTINPUT_COLOR,
          }}
          placeholder="Example Company Name"
          keyboardType="default"
          value={bounty?.companyName}
          placeholderTextColor={ColorSchema.PLACEHOLDER_COLOR}
          onChangeText={handleChange("companyName")}
          className="p-4 bg-01-creator-light-secondary rounded-[12px] text-[14px] leading-[20px] text-[#394E50] font-medium"
        />
      </View>

      <Subtitle title="Email" textColor="#FFFFFF" />
      <View className="mt-2 mb-6">
        <TextInput
          style={{
            fontFamily: "Nunito",
            width: "100%",
            color: ColorSchema.TEXTINPUT_COLOR,
          }}
          placeholder="business@mail.com"
          keyboardType="default"
          value={bounty?.email}
          placeholderTextColor={ColorSchema.PLACEHOLDER_COLOR}
          onChangeText={handleChange("email")}
          className="p-4 bg-01-creator-light-secondary rounded-[12px] text-[14px] leading-[20px] text-[#394E50] font-medium"
        />
      </View>

      <Subtitle title="Address" textColor="#FFFFFF" />
      <View className="mt-2 mb-6">
        <TextInput
          style={{
            fontFamily: "Nunito",
            width: "100%",
            color: ColorSchema.TEXTINPUT_COLOR,
          }}
          placeholder="123 Street, Cityname"
          keyboardType="default"
          value={bounty?.address}
          placeholderTextColor={ColorSchema.PLACEHOLDER_COLOR}
          onChangeText={handleChange("address")}
          className="p-4 bg-01-creator-light-secondary rounded-[12px] text-[14px] leading-[20px] text-[#394E50] font-medium"
        />
      </View>

      <Subtitle title="Country" textColor="#FFFFFF" />
      <View className="mt-2 mb-6">
        <TextInput
          style={{
            fontFamily: "Nunito",
            width: "100%",
            color: ColorSchema.TEXTINPUT_COLOR,
          }}
          placeholder="Country"
          keyboardType="default"
          value={bounty?.country}
          placeholderTextColor={ColorSchema.PLACEHOLDER_COLOR}
          onChangeText={handleChange("country")}
          className="p-4 bg-01-creator-light-secondary rounded-[12px] text-[14px] leading-[20px] text-[#394E50] font-medium"
        />
      </View>

      <View className="flex flex-row mt-2 bg-[#2E6297]/[0.5] rounded-xl p-4 items-center">
        <CheckboxOption
          value={isTermsagree}
          setValue={(val: boolean) => {
            setIsTermsagree(val);
            setIsTerms(val);
          }}
          color="border-[#00B0AD]"
        />
        <Text
          style={{ fontFamily: "Nunito" }}
          className="flex-1 text-[16px] font-medium text-white leading-[22px] ml-4"
        >
          By checking this button, I have agreed with Recyclium’s Terms and
          Conditions
        </Text>
      </View>

      {/* <View className="mt-2 mb-6">
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <EYSigninButton username={username} />
        </TouchableOpacity>
      </View> */}

      {showStart && (
        <DateTimePicker
          testID="datePicker1"
          value={startDate}
          mode="date"
          is24Hour
          onChange={onChangeStart}
        />
      )}
      {showEnd && (
        <DateTimePicker
          testID="datePicker2"
          value={endDate}
          mode="date"
          is24Hour
          onChange={onChangeEnd}
        />
      )}

      <Modal
        transparent
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <ModalEYSignin
          onClose={() => setModalVisible(false)}
          username={username}
          setUsername={setUsername}
        />
      </Modal>
    </View>
  );
};

export default memo(CreateMissionInputFields);
