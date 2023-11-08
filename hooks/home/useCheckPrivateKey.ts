import { useEffect } from "react";
import * as Crypto from "expo-crypto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { StorageType } from "enums/storageTypes";
import { getValueFromSecureStore } from "lib/secureStore";

const useCheckPrivateKey = () => {
  useEffect(() => {
    const getSecureStore = async () => {
      const privateKeyLength = 32; // 256-bit private key

      const creatorPrivateKey = await getValueFromSecureStore(
        StorageType.PRIVATE_KEY_CREATOR,
      );

      const collectorPrivateKey = await getValueFromSecureStore(
        StorageType.PRIVATE_KEY_COLLECTOR,
      );

      const storerPrivateKey = await getValueFromSecureStore(
        StorageType.PRIVATE_KEY_STORER,
      );

      /** if there is no private keys, we will create for both roles */
      if (!creatorPrivateKey) {
        const randomValueCreator = await Crypto.digestStringAsync(
          Crypto.CryptoDigestAlgorithm.SHA256,
          Math.random().toString(),
        );

        const randomPrivateKeyCreator = `0x${randomValueCreator.slice(
          0,
          privateKeyLength * 2,
        )}`;

        try {
          await AsyncStorage.setItem(
            StorageType.PRIVATE_KEY_CREATOR,
            JSON.stringify(randomPrivateKeyCreator),
          );
        } catch (error) {
          Toast.show({
            type: "error",
            text1: error?.message,
          });
        }
      }

      if (!collectorPrivateKey) {
        const randomValueCollector = await Crypto.digestStringAsync(
          Crypto.CryptoDigestAlgorithm.SHA256,
          Math.random().toString(),
        );

        const randomPrivateKeyCollector = `0x${randomValueCollector.slice(
          0,
          privateKeyLength * 2,
        )}`;

        try {
          await AsyncStorage.setItem(
            StorageType.PRIVATE_KEY_COLLECTOR,
            JSON.stringify(randomPrivateKeyCollector),
          );
        } catch (error) {
          Toast.show({
            type: "error",
            text1: error?.message,
          });
        }
      }

      if (!storerPrivateKey) {
        const randomValueStorer = await Crypto.digestStringAsync(
          Crypto.CryptoDigestAlgorithm.SHA256,
          Math.random().toString(),
        );

        const randomPrivateKeyStorer = `0x${randomValueStorer.slice(
          0,
          privateKeyLength * 2,
        )}`;

        try {
          await AsyncStorage.setItem(
            StorageType.PRIVATE_KEY_STORER,
            JSON.stringify(randomPrivateKeyStorer),
          );
        } catch (error) {
          Toast.show({
            type: "error",
            text1: error?.message,
          });
        }
      }
    };
    getSecureStore();
  }, []);
};

export { useCheckPrivateKey };
