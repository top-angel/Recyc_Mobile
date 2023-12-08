import { View, Text, TouchableOpacity } from "react-native";
import { FC, memo } from "react";

type Props = {
  title: string;
  handleSubmit: () => void;
  isTermsagree: boolean;
};

const RegisterCollectorButton: FC<Props> = ({ title, handleSubmit, isTermsagree }) => {
  return (
    <TouchableOpacity onPress={handleSubmit} disabled={!isTermsagree}>
      <View
        className={`rounded-[14px] bg-[#00B0AD] p-4 ${
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

export default memo(RegisterCollectorButton);
