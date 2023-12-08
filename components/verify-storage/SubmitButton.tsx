import { View, Text, TouchableOpacity } from "react-native";
import { FC, memo } from "react";

type Props = {
  title: string;
  handleSubmit: () => void;
  isTermsagree: boolean;
};

const SubmitButton: FC<Props> = ({ title, handleSubmit, isTermsagree }) => {
  return (
    <TouchableOpacity onPress={handleSubmit} disabled={!isTermsagree}>
      <View
        className={`rounded-[14px] bg-[#101828] p-4 ${
          isTermsagree ? "opacity-100" : "opacity-40"
        } `}
      >
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[#FFFFFF] text-[20px] leading-[24px] font-bold text-center"
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(SubmitButton);
