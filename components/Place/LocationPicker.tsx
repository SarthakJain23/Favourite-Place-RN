import { NavigationProp, useNavigation } from "@react-navigation/native";
import {
  getCurrentPositionAsync,
  PermissionStatus,
  useForegroundPermissions,
} from "expo-location";
import { useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../../configs/types";
import { Colors } from "../../constants/colors";
import { getMapPreview } from "../../util/location";
import OutlineButton from "../ui/OutlineButton";

type PickedLocation = {
  lat: number;
  lng: number;
};

const LocationPicker: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [pickedLocation, setPickedLocation] = useState<PickedLocation | null>(
    null,
  );
  const [permissionInfo, requestPermission] = useForegroundPermissions();

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
        "You need to grant location permissions to use this app.",
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  };
  const pickOnMapHandler = () => {
    navigation.navigate("Map");
  };

  return (
    <View>
      <View style={styles.mapPreview}>
        {pickedLocation ? (
          <Image
            source={{
              uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
            }}
            style={styles.mapPreviewImage}
          />
        ) : (
          <Text>No location picked yet.</Text>
        )}
      </View>
      <View style={styles.actions}>
        <OutlineButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlineButton>
        <OutlineButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlineButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  mapPreviewImage: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
});

export default LocationPicker;
