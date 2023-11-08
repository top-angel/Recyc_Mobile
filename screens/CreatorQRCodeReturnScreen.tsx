import { View, Text, TouchableOpacity } from "react-native";
import { memo, FC, useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useAppDispatch } from "../redux/hooks";
import { useShowNavigationHeader } from "../hooks/useShowNavigationHeader";
import { ColorSchema } from "../enums/colorSchema";
import { ROUTES } from "../navigation/NavigationTypes";
import { useGetCreatorPublicAddress } from "../hooks/aggregates/useGetCreatorPublicAddress";
import { returnBountyItem } from "../redux/bounties/bountyReturnItem/bountyReturnItem.action";
import { useRedirectOnSuccessReturn } from "../hooks/storer/useRedirectOnSuccessReturn";
import Spinner from "../components/global/Spinner";

const CreatorQRCodeReturnScreen: FC = () => {
  const route = useRoute<RouteProp<{ params: { bountyId: string } }>>();
  const { bountyId } = route.params;

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const dispatch = useAppDispatch();

  /* Show navigation header */
  useShowNavigationHeader({
    headerColor: ColorSchema.CREATOR_COLOR,
    isBackVisible: true,
    isTitleVisible: true,
    navigateToHome: ROUTES.HOME,
  });

  /** GET STORER WALLET ADDRESS */
  const { publicAddress } = useGetCreatorPublicAddress();

  /** REDIRECT USER ON SUCCESS RETURN ITEM */
  const { loading } = useRedirectOnSuccessReturn();

  const getBarCodeScannerPermissions = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  useEffect(() => {
    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    if (data && publicAddress && bountyId) {
      dispatch(
        returnBountyItem({
          walletAddress: publicAddress,
          bountyId,
          serialNumber: data,
          isOwner: true,
        }),
      );
      setScanned(true);
    }
  };

  if (hasPermission === null) {
    return (
      <View className="flex-1 bg-01-blue-mission items-center pt-6">
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[18px] leading-[23px] font-bold text-[#FFFFFF] text-center"
        >
          Requesting for camera permission
        </Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View className="flex-1 bg-01-blue-mission justify-center items-center">
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[18px] leading-[23px] font-bold text-[#FFFFFF] text-center"
        >
          No access to camera
        </Text>
        <TouchableOpacity onPress={() => getBarCodeScannerPermissions()}>
          <View className="mt-4 rounded-[8px] bg-01-creator-dark py-4 px-6">
            <Text
              style={{ fontFamily: "Nunito" }}
              className="text-[18px] leading-[23px] font-bold text-[#FFFFFF] text-center"
            >
              Allow access
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-01-blue-mission">
      {loading ? <Spinner /> : null}
      <View className="flex-1 bg-01-blue-mission">
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: "85%" }}
        />
      </View>

      {scanned && (
        <TouchableOpacity
          onPress={() => setScanned(false)}
          className="p-4 bg-01-blue-mission items-center mb-4"
        >
          <View className="px-6 py-4 bg-01-creator-dark w-[200px] rounded-[12px] -mt-5">
            <Text
              style={{ fontFamily: "Nunito" }}
              className="text-[14px] leading-[23px] font-medium text-[#FFFFFF] text-center"
            >
              Tap to scan again
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default memo(CreatorQRCodeReturnScreen);
