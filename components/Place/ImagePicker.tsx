import {
  launchCameraAsync,
  PermissionStatus,
  useCameraPermissions,
} from "expo-image-picker";
import { useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import OutlineButton from "../ui/OutlineButton";

interface ImagePickerProps {
  onImagePicked: (imageUri: string) => void;
}

const ImagePicker: React.FC<ImagePickerProps> = ({ onImagePicked }) => {
  const [pickedImage, setPickedImage] = useState<string>();
  const [permissionInfo, requestPermission] = useCameraPermissions();

  const verifyPermissions = async () => {
    if (!permissionInfo) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (permissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (permissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permissions to use this app.",
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    if (!image.canceled) {
      const imageUri = image.assets[0].uri;
      setPickedImage(imageUri);
      onImagePicked(imageUri);
    }
  };

  return (
    <View>
      <View style={styles.imagePreview}>
        {pickedImage ? (
          <Image source={{ uri: pickedImage }} style={styles.image} />
        ) : (
          <View>
            <Text>No image taken yet.</Text>
          </View>
        )}
      </View>
      <OutlineButton icon="camera" onPress={takeImageHandler}>
        Take Image
      </OutlineButton>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
});

export default ImagePicker;
