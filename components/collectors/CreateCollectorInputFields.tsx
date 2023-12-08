import { View, Text, TextInput } from "react-native";
import { FC, memo, useState } from "react";
import CheckboxOption from "components/global/CheckboxOption";
import { ColorSchema } from "enums/colorSchema";
import CreatorImagePicker from "components/createMissions/CreatorImagePicker";
import { CreatorDoc } from "../../redux/creators/creators.types";
import Subtitle from "../global/Subtitle";

type Props = {
  bounty: CollectorBounty;
  handleChange: (key: keyof CreatorDoc) => (text: string) => void;
  image: string;
  setImage: (arg: string) => void;
  accessToken: string;
  setFormDataFile: (arg: FormDataFile) => void;
  setIsTerms: (arg: boolean) => void;
};

const CreateCollectorInputFields: FC<Props> = ({
  bounty,
  handleChange,
  image,
  setImage,
  accessToken,
  setFormDataFile,
  setIsTerms,
}) => {

  const [isTermsagree, setIsTermsagree] = useState<boolean>(false);

  return (
    <View className="mt-4">
      <View className="mt-2 mb-6 p-4 bg-01-creator-background-dark-color rounded-xl">
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
          bgColor="#2E6297"
        />
      </View>

      <Subtitle title="First Name" textColor="#FFFFFF" />
      <View className="mt-2 mb-6">
        <TextInput
          style={{
            fontFamily: "Nunito",
            width: "100%",
            color: ColorSchema.TEXTINPUT_COLOR,
          }}
          placeholder="First Name"
          keyboardType="default"
          value={bounty?.firstName}
          placeholderTextColor={ColorSchema.PLACEHOLDER_COLOR}
          onChangeText={handleChange("firstName")}
          className="p-4 bg-01-creator-light-secondary rounded-[12px] text-[14px] leading-[20px] text-[#394E50] font-medium"
        />
      </View>

      <Subtitle title="Last Name" textColor="#FFFFFF" />
      <View className="mt-2 mb-6">
        <TextInput
          style={{
            fontFamily: "Nunito",
            width: "100%",
            color: ColorSchema.TEXTINPUT_COLOR,
          }}
          placeholder="Last Name"
          keyboardType="default"
          value={bounty?.lastName}
          placeholderTextColor={ColorSchema.PLACEHOLDER_COLOR}
          onChangeText={handleChange("lastName")}
          className="p-4 bg-01-creator-light-secondary rounded-[12px] text-[14px] leading-[20px] text-[#394E50] font-medium"
        />
      </View>

      <View className="flex flex-row mt-2 bg-[#10182880] rounded-xl p-4 items-center">
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
    </View>
  );
};

export default memo(CreateCollectorInputFields);
