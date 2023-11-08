import { useEffect } from "react";
import { useAppDispatch } from "redux/hooks";
import { checkIfStorerExist } from "redux/storers/storerCheck/storerCheck.action";

type Props = {
  publicAddress: string;
};

const useCheckIfStorerExists = ({ publicAddress }: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (publicAddress) {
      dispatch(checkIfStorerExist({ walletAddress: publicAddress }));
    }
  }, [publicAddress, dispatch]);
};

export { useCheckIfStorerExists };
