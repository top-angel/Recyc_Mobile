import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { memo, FC, useState } from "react";
import Slider from "@react-native-community/slider";
import { missionTags } from "lib/dataForMissionFilter";
import CloseIcon from "../icons/CloseIcon";
import Subtitle from "../global/Subtitle";
import SingleMissionTag from "./SingleMissionTag";

type Props = {
  setModalVisible: (arg: boolean) => void;
};

const ModalMissionFilter: FC<Props> = ({ setModalVisible }) => {
  const [companyTitle, setCompanyTitle] = useState<string>("");
  const [tagIds, setTagIds] = useState<string[]>([]);
  const [range, setRange] = useState<number>(4.5);

  return (
    <View className="flex-1 justify-end">
      <View
        className="bg-white rounded-t-[20px] p-5"
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
        <View className="flex flex-row items-center justify-between mb-6">
          <Text
            style={{ fontFamily: "Nunito" }}
            className="text-[22px] leading-[36px] font-bold text-[#454545]"
          >
            Filter
          </Text>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <CloseIcon style={{ width: 28, height: 28, color: "#454545" }} />
          </TouchableOpacity>
        </View>

        <Subtitle title="Company title" textColor="#425D7E" />
        <TextInput
          style={{ fontFamily: "Nunito", width: "100%" }}
          placeholder="Company Title"
          keyboardType="default"
          value={companyTitle}
          placeholderTextColor="#425D7E"
          onChangeText={(text) => setCompanyTitle(text)}
          className="bg-[#C4CAE9] p-4 rounded-[12px] text-[14px] leading-[20px] text-[#425D7E] font-medium mt-2 mb-6"
        />

        <Subtitle title="Tags" textColor="#425D7E" />

        <View className="flex flex-row items-center justify-between mt-2">
          {missionTags.map((item) => (
            <SingleMissionTag
              key={item.id}
              tag={item}
              tagIds={tagIds}
              setTagIds={setTagIds}
            />
          ))}
        </View>

        <View className="mt-6">
          <View className="flex flex-row items-center justify-between">
            <Subtitle textColor="#454545" title="Price range (per item)" />
            <Text
              style={{ fontFamily: "Nunito" }}
              className="text-[14px] leading-[20px] font-normal text-[#454545]"
            >
              {range.toFixed(1)}$
            </Text>
          </View>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <Slider
            style={{ width: "100%", height: 40 }}
            minimumValue={0}
            maximumValue={10}
            minimumTrackTintColor="#2E6297"
            maximumTrackTintColor="rgba(46, 98, 151, 0.3)"
            thumbTintColor="#2E6297"
            onValueChange={(value: any) => setRange(value)}
            step={0.1}
            value={range}
          />
        </View>

        <TouchableOpacity onPress={() => setModalVisible(false)}>
          <View className="bg-02-purple-mission rounded-[20px] p-4 my-6">
            <Text
              style={{ fontFamily: "Nunito" }}
              className="text-[18px] leading-[23px] font-bold text-[#FFFFFF] text-center"
            >
              Apply
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(ModalMissionFilter);
