import { NavigationProp, RouteProp } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Loader from "../components/ui/Loader";
import OutlineButton from "../components/ui/OutlineButton";
import { Place, RootStackParamList } from "../configs/types";
import { Colors } from "../constants/colors";
import { fetchPlaceDetails } from "../utils/database";

interface PlaceDetailScreenProps {
  navigation: NavigationProp<RootStackParamList, "PlaceDetail">;
  route: RouteProp<RootStackParamList, "PlaceDetail">;
}

const PlaceDetailScreen: React.FC<PlaceDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const placeId = route.params.placeId;
  const [place, setPlace] = useState<Place | null>(null);

  const onPressViewOnMapHandler = (place: Place) => {
    const location = place.location;
    navigation.navigate("Map", {
      pickedLocation: {
        latitude: location.latitude,
        longitude: location.longitude,
      },
    });
  };

  const loadPlaceDetails = async () => {
    try {
      const fetchedPlace = await fetchPlaceDetails(placeId);
      setPlace(fetchedPlace);
    } catch (error) {
      console.error("Failed to load place details:", error);
    }
  };

  useEffect(() => {
    loadPlaceDetails();
  }, [placeId]);

  if (!place) {
    return <Loader />;
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: place.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{place.address}</Text>
        </View>
        <OutlineButton
          icon="map"
          onPress={() => onPressViewOnMapHandler(place)}
        >
          View on Map
        </OutlineButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default PlaceDetailScreen;
