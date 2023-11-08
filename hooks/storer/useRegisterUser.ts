import { useEffect } from "react";
import { StorageType } from "enums/storageTypes";
import { setValueIntoSecureCode } from "lib/secureStore";
import { registerUser } from "redux/auth/authRegister/authRegister.actions";
import { useAppDispatch, useAppSelector } from "redux/hooks";

type Props = {
  isRegistered: boolean;
  publicAddress: string;
};

const useRegisterUser = ({ isRegistered, publicAddress }: Props) => {
  const { status, success } = useAppSelector((state) => state.authRegister);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isRegistered && isRegistered !== undefined && publicAddress) {
      dispatch(registerUser({ public_address: publicAddress }));
    }
  }, [isRegistered, publicAddress, dispatch]);

  useEffect(() => {
    const setSecureStore = async () => {
      await setValueIntoSecureCode(StorageType.IS_REGISTERED_STORER, "success");
    };

    if (success && status === "success") {
      setSecureStore();
    }
  }, [status, success]);
};

export { useRegisterUser };
