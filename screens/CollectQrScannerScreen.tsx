import { View, Text, TouchableOpacity } from "react-native";
import { memo, FC, useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera, CameraType } from "expo-camera";
import CameraHeader from "components/verify-storage/CameraHeader";
import CameraFooter from "components/verify-storage/CameraFooter";
import ClaimedMissionCard from "components/collectors/ClaimedMissionCard";
import { useGetAccessToken } from "hooks/collectors/useGetAccessToken";
import { useShowNavigationHeader } from "../hooks/useShowNavigationHeader";
import { ColorSchema } from "../enums/colorSchema";
import { ROUTES } from "../navigation/NavigationTypes";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useGetCollectorPublicAddress } from "../hooks/aggregates/useGetCollectorPublicAddress";
import { collectBountyItem } from "../redux/bounties/bountyCollectItem/bountyCollectItem.action";

const CollectQrScannerScreen: FC = () => {
  const [type, setType] = useState(CameraType.back);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [captureImage, setCaptureImage] = useState(null);
  const [serialNumber, setSerialNumber] = useState(null);
  const [scanSuccess, setScanSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { success, bountyItem } = useAppSelector(
    (state) => state.bountyGetBySerNumber,
  );

  const { result } = useAppSelector((state) => state.missionQueryPublic);
  const { missions } = useAppSelector((state) => state.missionsGetInProgress);

  const dispatch = useAppDispatch();

  /** GET ACCESS_TOKEN */
  const { accessToken } = useGetAccessToken();

  /** FETCH COLLECTOR WALLET ADDRESS */
  const { publicAddress } = useGetCollectorPublicAddress();

  useEffect(() => {
    setScanSuccess(false);
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back,
    );
  }

  const takePhoto = async () => {
    if (camera) {
      const data = await camera.takePictureAsync();
      const results = await BarCodeScanner.scanFromURLAsync(data.uri);
      if (results.length > 0) {
        setCaptureImage(data);
      } else {
        alert("There is no QR code image. Please take a picture again!");
      }
    }
  };

  const onBarCodeScanned = ({ type, data }) => {
    if (captureImage) {
      setSerialNumber(data);
      setScanSuccess(true);
    }
  };

  const displayQRCode = () => {
    if (serialNumber && captureImage && scanSuccess) {
      const mime = captureImage.uri.split(".").pop();
      const filename = captureImage.uri.split("/").pop();
      const imageName = `${new Date().getTime()}.${filename}`;

      const file: FormDataFile = {
        uri: captureImage.uri,
        name: imageName,
        type: `image/${mime}`,
      };
      dispatch(
        collectBountyItem({
          serialNumber,
          // bountyId: linkedEvents[0].bountyid,
          bountyId: result[0].id,
          walletAddress: publicAddress,
          isCollector: true,
          accessToken,
          fileData: file,
          mission_id: missions[0].id,
          setLoading,
        }),
      );
      setScanSuccess(false);
      setCaptureImage(null);
    }
  };

  const tryAgain = () => {
    setScanSuccess(false);
  };

  if (hasCameraPermission === false) {
    return (
      <View className="flex-1 bg-02-purple-mission items-center pt-6">
        <Text
          style={{ fontFamily: "Nunito" }}
          className="text-[18px] leading-[23px] font-bold text-[#FFFFFF] text-center"
        >
          Requesting camera permission
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 ">
      {loading ? <Spinner /> : null}
      <Camera
        ref={(ref) => setCamera(ref)}
        type={type}
        className="flex-1 justify-between"
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
        }}
        pictureSize="800x600"
        onBarCodeScanned={onBarCodeScanned}
      >
        <CameraHeader />
        {!captureImage && !scanSuccess && (
          <CameraFooter
            takePhoto={takePhoto}
            toggleCameraType={toggleCameraType}
          />
        )}
        {captureImage && scanSuccess && (
          <ClaimedMissionCard
            // displayQRCode={displayQRCode}
            // serialNumber={serialNumber}
            totalReturns={2}
          />
        )}
        {/* {captureImage && scanSuccess && !serialNumber && (
          <CameraScanFailed tryAgain={tryAgain} />
        )} */}
      </Camera>
    </View>
  );
};

export default memo(CollectQrScannerScreen);
