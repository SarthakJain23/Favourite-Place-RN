import { useState } from "react";
import { StyleSheet } from "react-native";
import MapView, { MapPressEvent, Marker, Region } from "react-native-maps";

type SelectedLocation = {
  latitude: number;
  longitude: number;
};

const MapScreen: React.FC = () => {
  const [selectedLocation, setSelectedLocation] =
    useState<SelectedLocation | null>(null);

  const region: Region = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = (event: MapPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
  };

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
