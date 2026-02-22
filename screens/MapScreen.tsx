import { NavigationProp, RouteProp } from "@react-navigation/native";
import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { MapPressEvent, Marker, Region } from "react-native-maps";
import IconButton from "../components/ui/IconButton";
import { Location, RootStackParamList } from "../configs/types";

interface MapScreenProps {
  navigation: NavigationProp<RootStackParamList, "Map">;
  route: RouteProp<RootStackParamList, "Map">;
}

const MapScreen: React.FC<MapScreenProps> = ({ navigation, route }) => {
  const { pickedLocation } = route.params || {};
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    pickedLocation ?? null,
  );

  const region: Region = {
    latitude: pickedLocation ? pickedLocation.latitude : 37.78,
    longitude: pickedLocation ? pickedLocation.longitude : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = (event: MapPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
  };

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No location picked!",
        "Please pick a location by tapping on the map before saving.",
      );
      return;
    }
    navigation.navigate("AddPlace", {
      pickedLocation: selectedLocation,
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }: { tintColor: string }) => (
        <IconButton
          icon="save"
          size={24}
          color={tintColor!}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler]);

  return (
    <MapView
      initialRegion={region}
      style={styles.map}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker title="Selected Location" coordinate={selectedLocation} />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default MapScreen;
