import { View, Text, TextInput, Platform } from "react-native";
import { memo, FC, useState, useCallback } from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { ColorSchema } from "enums/colorSchema";
import { CreatorDoc } from "redux/creators/creators.types";
import Title from "../global/Title";
import Subtitle from "../global/Subtitle";
import WorldwideSwitch from "../global/WorldwideSwitch";
import DatePickerAndroid from "../createMissions/DatePickerAndroid";
import DatePickerIOS from "../createMissions/DatePickerIOS";

type Props = {
  bounty: BountyUpdate;
  handleUpdate: (key: keyof CreatorDoc) => (text: string) => void;
  isWorldwide: boolean;
  setIsWorldwide: (arg: boolean) => void;
  startDate: Date;
  setStartDate: (arg: Date) => void;
  endDate: Date;
  setEndDate: (arg: Date) => void;
};

const MissionUpdateInputFields: FC<Props> = ({
  bounty,
  handleUpdate,
  isWorldwide,
  setIsWorldwide,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  const isIos = Platform.OS === "ios" || Platform.OS === "macos";

  const [showStart, setShowStart] = useState<boolean>(false);
  const [startChanged, setStartChanged] = useState<boolean>(false);
  const [showEnd, setShowEnd] = useState<boolean>(false);
  const [endChanged, setEndChanged] = useState<boolean>(false);

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
    <View className="flex-1 bg-white rounded-t-[20px] z-20 p-4 -mt-7">
      <Title
        title="Mission Details"
        textColor={ColorSchema.CREATOR_COLOR_ICON}
      />

      <View className="mt-4 mb-2 space-y-2">
        <Subtitle
          title="Mission Title"
          textColor={ColorSchema.CREATOR_COLOR_ICON}
        />
        <TextInput
          style={{ fontFamily: "Nunito", width: "100%" }}
          placeholder="Mission Title"
          keyboardType="default"
          value={bounty?.missionTitle}
          placeholderTextColor={ColorSchema.CREATOR_COLOR_ICON}
          onChangeText={handleUpdate("missionTitle")}
          className="p-4 bg-01-creator-light-secondary rounded-[12px] text-[14px] leading-[20px] text-01-creator-dark font-medium"
        />
      </View>

      <View className="mt-4 mb-2 space-y-2">
        <Subtitle
          title="Company Title"
          textColor={ColorSchema.CREATOR_COLOR_ICON}
        />
        <TextInput
          style={{ fontFamily: "Nunito", width: "100%" }}
          placeholder="Company Title"
          keyboardType="default"
          value={bounty?.companyTitle}
          placeholderTextColor={ColorSchema.CREATOR_COLOR_ICON}
          onChangeText={handleUpdate("companyTitle")}
          className="p-4 bg-01-creator-light-secondary rounded-[12px] text-[14px] leading-[20px] text-01-creator-dark font-medium"
        />
      </View>

      <View className="mt-4 mb-6 space-y-2">
        <Subtitle
          title="Mission Description"
          textColor={ColorSchema.CREATOR_COLOR_ICON}
        />
        <TextInput
          style={{
            fontFamily: "Nunito",
            width: "100%",
            height: 100,
          }}
          placeholder="Mission Description"
          keyboardType="default"
          numberOfLines={Platform.OS === "ios" ? null : 4}
          value={bounty?.missionDescription}
          placeholderTextColor={ColorSchema.CREATOR_COLOR_ICON}
          onChangeText={handleUpdate("companyTitle")}
          className="p-4 bg-01-creator-light-secondary rounded-[12px] text-[14px] leading-[20px] text-01-creator-dark font-medium"
        />
      </View>

      <Subtitle
        title="Total Rewards to be allocated"
        textColor={ColorSchema.CREATOR_COLOR_ICON}
      />
      <View className="mt-4 flex flex-row items-center justify-between">
        <TextInput
          style={{ fontFamily: "Nunito", width: "70%" }}
          placeholder="0.0 USD"
          keyboardType="decimal-pad"
          value={
            bounty?.totalRewards > 0 ? bounty?.totalRewards.toString() : ""
          }
          placeholderTextColor={ColorSchema.CREATOR_COLOR_ICON}
          onChangeText={handleUpdate("totalRewards")}
          className="p-4 bg-01-creator-light-secondary rounded-[12px] text-[14px] leading-[20px] text-01-creator-dark font-medium"
        />
        <Subtitle
          title="0.0$ per Item"
          textColor={ColorSchema.CREATOR_COLOR_ICON}
        />
      </View>

      <View className="mt-6 flex flex-row items-center justify-between">
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[16px] leading-[24px] text-01-creator-dark font-medium opacity-40"
        >
          Location
        </Text>
        <View className="flex flex-row items-center">
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[16px] leading-[24px] text-01-creator-dark font-light"
          >
            Available Worldwide
          </Text>
          <WorldwideSwitch value={isWorldwide} setValue={setIsWorldwide} />
        </View>
      </View>

      <View className="flex flex-row mt-2 mb-6">
        <View className="w-[48%]">
          <Subtitle
            title="Available from"
            textColor={ColorSchema.CREATOR_COLOR_ICON}
          />
          {!isIos ? (
            <DatePickerAndroid
              handlePressDate={handlePressStartDate}
              dateChanged={startChanged}
              date={startDate}
              showItem={showStart}
            />
          ) : null}

          {isIos ? (
            <DatePickerIOS date={startDate} handlePressDate={onChangeStart} />
          ) : null}
        </View>
        <View className="w-[48%]">
          <Subtitle title="Until" textColor={ColorSchema.CREATOR_COLOR_ICON} />
          {!isIos ? (
            <DatePickerAndroid
              handlePressDate={handlePressEndDate}
              dateChanged={endChanged}
              date={endDate}
              showItem={showEnd}
            />
          ) : null}

          {isIos ? (
            <DatePickerIOS date={endDate} handlePressDate={onChangeEnd} />
          ) : null}
        </View>

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
      </View>
    </View>
  );
};

export default memo(MissionUpdateInputFields);
