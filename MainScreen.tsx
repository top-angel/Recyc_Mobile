import { memo, FC, useCallback, useLayoutEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LogBox, Platform, SafeAreaView, View, StatusBar } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import CollectorWallet from "screens/CollectorWallet";
import StorerWallet from "screens/StorerWallet";
import { useCheckPrivateKey } from "hooks/home/useCheckPrivateKey";
import CollectorRegistration from "screens/CollectorRegistration";
import { toastConfig } from "./lib/configToast";
import HomeScreen from "./screens/HomeScreen";
import { RootStackParamList, ROUTES } from "./navigation/NavigationTypes";
import CollectMissionsScreen from "./screens/CollectMissionsScreen";
import VerifyAndStorageScreen from "./screens/VerifyAndStorageScreen";
import CreateMissionScreen from "./screens/CreateMissionScreen";
import StorerStorageScreen from "./screens/StorerStorageScreen";
import StorerProfileScreen from "./screens/StorerProfileScreen";
import StorerChatScreen from "./screens/StorerChatScreen";
import StorerChatRoom from "./screens/StorerChatRoom";
import CreatorCreateScreen from "./screens/CreatorCreateScreen";
import { useAppSelector } from "./redux/hooks";
import CreatorCreatedScreen from "./screens/CreatorCreatedScreen";
import CreatorMissionSingleScreen from "./screens/CreatorMissionSingleScreen";
import CreatorChatScreen from "./screens/CreatorChatScreen";
import CreatorChatRoomScreen from "./screens/CreatorChatRoomScreen";
import CreatorItemStatusScreen from "./screens/CreatorItemStatusScreen";
import CreatorItemStatusCollectorsScreen from "./screens/CreatorItemStatusCollectorsScreen";
import CreatorItemStatusStorersScreen from "./screens/CreatorItemStatusStorersScreen";
import CreatorItemLogScreen from "./screens/CreatorItemLogScreen";
import CreatorMissionDetailScreen from "./screens/CreatorMissionDetailScreen";
import CollectorChatScreen from "./screens/CollectorChatScreen";
import CollectorChatRoomScreen from "./screens/CollectorChatRoomScreen";
import CollectorProfileScreen from "./screens/CollectorProfileScreen";
import CollectorSingleMissionScreen from "./screens/CollectorSingleMissionScreen";
import CollectorAboutScreen from "./screens/CollectorAboutScreen";
import CollectTraceMissionScreen from "./screens/CollectTraceMissionScreen";
import CollectMissionClaimedScreen from "./screens/CollectMissionClaimedScreen";
import CollectExploreMissionsScreen from "./screens/CollectExploreMissionsScreen";
import CollectUploadFileScreen from "./screens/CollectUploadFileScreen";
import CreatorItemImagesScreen from "./screens/CreatorItemImagesScreen";
import CreatorQRScannerScreen from "./screens/CreatorQRScannerScreen";
import CreatorTraceReportScreen from "./screens/CreatorTraceReportScreen";
import CollectQrScannerScreen from "./screens/CollectQrScannerScreen";
import CollectItemsCollectedScreen from "./screens/CollectItemsCollectedScreen";
import CollectAggregatedQRCodeScreen from "./screens/CollectAggregatedQRCodeScreen";
import StorerCheckingProfileScreen from "./screens/StorerCheckingProfileScreen";
import StorerQRHandshakeScreen from "./screens/StorerQRHandshakeScreen";
import StorerTrackItemsScreen from "./screens/StorerTrackItemsScreen";
import StorerQRCodeVerifyScreen from "./screens/StorerQRCodeVerifyScreen";
import CreatorQRCodeReturnScreen from "./screens/CreatorQRCodeReturnScreen";
import StorerAggregatedCodeScreen from "./screens/StorerAggregatedCodeScreen";
import StorerUploadImageScreen from "./screens/StorerUploadImageScreen";
import CollectorExplorerRedirectScreen from "./screens/CollectorExplorerRedirectScreen";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainScreen: FC = () => {
  /** CHECK PRIVATE KEYS FOR CREATOR AND COLLECTOR */
  /** ON FIRST LOAD, WE WILL GENERATE PRIVATE KEYS FOR COLLECTOR AND CREATOR */
  useCheckPrivateKey();

  useLayoutEffect(() => {
    LogBox.ignoreLogs([
      "Non-serializable values were found in the navigation state",
      'Key "cancelled" in the image picker result is deprecated and will be removed in SDK 48, use "canceled" instead',
      "Please report: Excessive number of pending callbacks",
    ]);
  }, []);

  const { backgroundColor } = useAppSelector(
    (state) => state.globalScreenColor,
  );

  const isIos = Platform.OS === "ios" || Platform.OS === "macos";

  const [fontsLoaded] = useFonts({
    // eslint-disable-next-line global-require
    Nunito: require("./assets/fonts/Nunito-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View className="flex-1" onLayout={onLayoutRootView}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        animated
        translucent
      />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerBackVisible: false,
          }}
        >
          <Stack.Screen
            name={ROUTES.CREATE_MISSION}
            component={CreateMissionScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={ROUTES.HOME}
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={ROUTES.CREATE_MISSION_CREATE}
            component={CreatorCreateScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={ROUTES.CREATE_MISSION_CREATED}
            component={CreatorCreatedScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={ROUTES.CREATE_MISSION_SINGLE}
            component={CreatorMissionSingleScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={ROUTES.CREATE_MISSION_CHAT}
            component={CreatorChatScreen}
          />
          <Stack.Screen
            name={ROUTES.CREATE_MISSION_CHAT_ROOM}
            component={CreatorChatRoomScreen}
          />
          <Stack.Screen
            name={ROUTES.CREATE_MISSION_ITEM_STATUS}
            component={CreatorItemStatusScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={ROUTES.CREATE_MISSION_ITEM_STATUS_COLLECTORS}
            component={CreatorItemStatusCollectorsScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={ROUTES.CREATE_MISSION_ITEM_STATUS_STORERS}
            component={CreatorItemStatusStorersScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={ROUTES.CREATE_MISSION_ITEM_LOG}
            component={CreatorItemLogScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={ROUTES.CREATE_MISSION_DETAILS}
            component={CreatorMissionDetailScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={ROUTES.CREATE_ITEM_IMAGES}
            component={CreatorItemImagesScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={ROUTES.CREATE_QR_SCANNER}
            component={CreatorQRScannerScreen}
          />
          <Stack.Screen
            name={ROUTES.CREATE_QR_SCANNER_RETURN}
            component={CreatorQRCodeReturnScreen}
          />
          <Stack.Screen
            name={ROUTES.CREATE_TRACE_REPORT}
            component={CreatorTraceReportScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={ROUTES.COLLECT_REGISTRATION}
            component={CollectorRegistration}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={ROUTES.COLLECT_MISSIONS}
            component={CollectMissionsScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={ROUTES.COLLECT_MISSION_CHAT}
            component={CollectorChatScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={ROUTES.COLLECT_MISSION_CHAT_ROOM}
            component={CollectorChatRoomScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={ROUTES.COLLECT_PROFILE}
            component={CollectorProfileScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={ROUTES.COLLECT_MISSION_SINGLE}
            component={CollectorSingleMissionScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={ROUTES.COLLECT_MISSIONS_ABOUT}
            component={CollectorAboutScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={ROUTES.COLLECT_TRACE_MISSION}
            component={CollectTraceMissionScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={ROUTES.COLLECT_WALLET_DETAILS}
            component={CollectorWallet}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={ROUTES.COLLECT_MISSION_CLAIMED}
            component={CollectMissionClaimedScreen}
          />
          <Stack.Screen
            name={ROUTES.COLLECT_EXPLORE_MISSION}
            component={CollectExploreMissionsScreen}
          />
          <Stack.Screen
            name={ROUTES.COLLECT_EXPLORE_REDIRECTION}
            component={CollectorExplorerRedirectScreen}
          />
          <Stack.Screen
            name={ROUTES.COLLECT_UPLOAD_FILE}
            component={CollectUploadFileScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={ROUTES.COLLECT_QR_SCANNER}
            component={CollectQrScannerScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={ROUTES.COLLECT_ITEMS_COLLECTED}
            component={CollectItemsCollectedScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={ROUTES.COLLECT_AGGREGATED_QRCODE}
            component={CollectAggregatedQRCodeScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={ROUTES.VERIFY_AND_STORAGE}
            component={VerifyAndStorageScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={ROUTES.VERIFY_AND_STORAGE_HOME}
            component={StorerStorageScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={ROUTES.VERIFY_AND_STORAGE_PROFILE}
            component={StorerProfileScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={ROUTES.VERIFY_AND_STORAGE_CHAT}
            component={StorerChatScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={ROUTES.VERIFY_AND_STORAGE_CHAT_ROOM}
            component={StorerChatRoom}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={ROUTES.VERIFY_AND_STORAGE_WALLET}
            component={StorerWallet}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={ROUTES.VERIFY_CHECKING_STORER}
            component={StorerCheckingProfileScreen}
          />
          <Stack.Screen
            name={ROUTES.VERIFY_QR_SCANNER_HANDSHAKE}
            component={StorerQRHandshakeScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={ROUTES.VERIFY_QR_SCANNER_VERIFY}
            component={StorerQRCodeVerifyScreen}
          />
          <Stack.Screen
            name={ROUTES.VERIFY_TRACK_ITEMS}
            component={StorerTrackItemsScreen}
          />
          <Stack.Screen
            name={ROUTES.VERIFY_AGGREGATED_CODES}
            component={StorerAggregatedCodeScreen}
          />
          <Stack.Screen
            name={ROUTES.VERIFY_UPLOAD_IMAGE}
            component={StorerUploadImageScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
        <Toast position="top" visibilityTime={4000} config={toastConfig} />
      </NavigationContainer>
    </View>
  );
};

export default memo(MainScreen);
