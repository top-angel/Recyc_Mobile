import { BaseToast, ErrorToast } from "react-native-toast-message";

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: "#72B01D",
        backgroundColor: "#FCFCFC",
        zIndex: 99999,
      }}
      contentContainerStyle={{ paddingHorizontal: 15, zIndex: 999 }}
      text1Style={{
        fontSize: 11,
        lineHeight: 11,
        fontWeight: "600",
        color: "#425D7E",
      }}
      text2Style={{
        fontSize: 11,
        lineHeight: 13,
        fontWeight: "600",
        color: "#425D7E",
      }}
    />
  ),

  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: "#DF5060",
        backgroundColor: "#FCFCFC",
        flexWrap: "wrap",
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 10,
        lineHeight: 13,
        fontWeight: "600",
        color: "#425D7E",
      }}
      text2Style={{
        fontSize: 10,
        lineHeight: 13,
        fontWeight: "600",
        color: "#425D7E",
      }}
    />
  ),
};
