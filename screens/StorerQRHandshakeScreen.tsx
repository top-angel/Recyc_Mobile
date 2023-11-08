import { View, Text } from "react-native";
import { FC, memo, useEffect, useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera, CameraType } from "expo-camera";
import CameraHeader from "components/verify-storage/CameraHeader";
import CameraFooter from "components/verify-storage/CameraFooter";
import StorerBeforeUploadCard from "components/verify-storage/StorerBeforeUploadCard";
import { useGetAccessToken } from "hooks/collectors/useGetAccessToken";
import { useGetBountyDescriptionForUpload } from "hooks/storer/useGetBountyDescriptionForUpload";

type FormDataFile = {
  uri: string;
  type: string;
  name: string;
};

const StorerQRHandshakeScreen: FC = () => {
  const [publicAddress, setPublicAddress] = useState("");
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [captureImage, setCaptureImage] = useState(null);
  const [serialNumber, setSerialNumber] = useState(null);
  const [scanSuccess, setScanSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isStored, setIsStored] = useState<boolean>(false);


  /** GET ACCESS_TOKEN */
  const { accessToken } = useGetAccessToken();

  /** GET BOUNTY DESCRIPTION */
  useGetBountyDescriptionForUpload({ accessToken });

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
        setScanSuccess(true);
      } else {
        alert("There is no QR code image. Please take a picture again!");
      }
    }
  };

  const onBarCodeScanned = ({ data }) => {
    setSerialNumber(data);
  };

  if (hasCameraPermission === false) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="flex text-center text-[20px]">
          No access to camera
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
          <View className="flex">
            <View className="flex bg-white/20 p-4">
              {!serialNumber ? (
                <Text
                  style={{ fontFamily: "Nunito" }}
                  className="text-[16px] leading-[20px] font-semibold text-black mr-2"
                >
                  Step 1 - Scan the QR Code of collector
                </Text>
              ) : (
                <Text
                  style={{ fontFamily: "Nunito" }}
                  className="text-[16px] leading-[20px] font-semibold text-black mr-2"
                >
                  Step 2 - Take Pictures of Items
                </Text>
              )}
            </View>
            <CameraFooter
              takePhoto={takePhoto}
              toggleCameraType={toggleCameraType}
            />
          </View>
        )}
        {captureImage && scanSuccess && (
          <StorerBeforeUploadCard
            totalReturns={11}
            fileData={captureImage}
            setLoading={setLoading}
            accessToken={accessToken}
            setIsStored={setIsStored}
            missionId={'99999'}
          />
        )}
        {/* {captureImage && scanSuccess && !serialNumber && (
          <CameraScanFailed tryAgain={tryAgain} />
        )} */}
      </Camera>
    </View>
  );
};

export default memo(StorerQRHandshakeScreen);
