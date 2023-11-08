import { useEffect } from "react";
import { useAppSelector } from "redux/hooks";

type Props = {
  setBounty: (arg: BountyUpdate) => void;
};

const useSetMissionById = ({ setBounty }: Props) => {
  const { success, result } = useAppSelector((state) => state.missionGetById);

  useEffect(() => {
    if (success && result.length > 0) {
      setBounty({
        missionTitle: result[0]?.bounty_name,
        missionDescription: result[0]?.bounty_description,
        companyTitle: result[0]?.company_name,
        totalRewards: 0,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result, success]);
};

export { useSetMissionById };
