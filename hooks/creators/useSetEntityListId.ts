import { useEffect } from "react";
import { useAppSelector } from "redux/hooks";

type Props = {
  setEntityListId: (arg: string) => void;
};

const useSetEntityListId = ({ setEntityListId }: Props) => {
  const { success, id } = useAppSelector((state) => state.creatorUploadImage);

  useEffect(() => {
    if (success && id) {
      setEntityListId(id);
    }
  }, [success, id, setEntityListId]);
};

export { useSetEntityListId };
