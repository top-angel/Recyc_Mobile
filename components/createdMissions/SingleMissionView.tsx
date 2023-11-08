import { View } from "react-native";
import { FC, memo } from "react";
import { useAppSelector } from "redux/hooks";
import MissionCardBanner from "../global/MissionCardBanner";

const SingleMissionView: FC = () => {
  const { result } = useAppSelector((state) => state.missionGetById);

  return (
    <View className="flex-1 bg-white rounded-t-[20px] z-20 p-4 -mt-7">
      <MissionCardBanner
        title={result?.[0]?.bounty_name}
        subtitle={result?.[0]?.company_name}
        backgroundColor="#86B6B9"
        totalItems={result?.[0]?.image_count}
        approvedItems={result?.[0]?.accepted_entity_count}
      />
    </View>
  );
};

export default memo(SingleMissionView);
