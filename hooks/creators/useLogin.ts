import "react-native-get-random-values";
import "@ethersproject/shims";
import { Wallet } from "ethers";
import { id } from "ethers/lib/utils";
import { useEffect } from "react";
import { loginUser } from "redux/auth/authLogin/authLogin.actions";
import { useAppDispatch, useAppSelector } from "redux/hooks";

type Props = {
  isRegistered: boolean;
  publicAddress: string;
  privateKey: string;
};

const useLogin = ({ isRegistered, publicAddress, privateKey }: Props) => {
  const { nonce, success, status } = useAppSelector(
    (state) => state.authGetNonce,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    const generateSignature = async () => {
      const signer = new Wallet(id(privateKey));
      const sig = await signer.signMessage(nonce.toString());
      dispatch(
        loginUser({
          public_address: publicAddress,
          signature: sig,
        }),
      );
    };

    if (isRegistered && nonce && success && status === "exists") {
      generateSignature();
    }
  }, [
    success,
    nonce,
    privateKey,
    isRegistered,
    status,
    publicAddress,
    dispatch,
  ]);
};

export { useLogin };
