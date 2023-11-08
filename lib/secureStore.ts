import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toast } from "react-native-toast-message/lib/src/Toast";

// eslint-disable-next-line consistent-return
export const getValueFromSecureStore = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);

    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    Toast.show({
      type: "error",
      text1: error.message,
    });
  }
};

export const setValueIntoSecureCode = async (key: string, value: string) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    Toast.show({
      type: "error",
      text1: error.message,
    });
  }
};

export const removeValueFromSecureStore = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    Toast.show({
      type: "error",
      text1: error.message,
    });
  }
};
