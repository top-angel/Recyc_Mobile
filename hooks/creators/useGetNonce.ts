import { useEffect } from "react";
import { getUserNonce } from "redux/auth/authGetNonce/authGetNonce.actions";
import { useAppDispatch, useAppSelector } from "redux/hooks";

type Props = {
  publicAddress: string;
  isRegistered: boolean;
};

const useGetNonce = ({ publicAddress, isRegistered }: Props) => {
  const { success } = useAppSelector((state) => state.authRegister);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (publicAddress && isRegistered) {
      dispatch(getUserNonce({ public_address: publicAddress }));
    }
  }, [publicAddress, dispatch, success, isRegistered]);
};

export { useGetNonce };
