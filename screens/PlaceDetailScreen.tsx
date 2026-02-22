import { RouteProp } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Loader from "../components/ui/Loader";
import OutlineButton from "../components/ui/OutlineButton";
import { RootStackParamList } from "../configs/types";
import { Colors } from "../constants/colors";
import { Place } from "../models/place";
import { fetchPlaceDetails } from "../utils/database";

interface PlaceDetailScreenProps {
  route: RouteProp<RootStackParamList, "PlaceDetail">;
}

const PlaceDetailScreen: React.FC<PlaceDetailScreenProps> = ({ route }) => {
  const placeId = route.params.placeId;
  const [place, setPlace] = useState<Place | null>(null);

  const onPressViewOnMapHandler = () => {};

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
      <Image style={styles.image} source={{ uri: place["imageUri"] }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{place["address"]}</Text>
        </View>
        <OutlineButton icon="map" onPress={onPressViewOnMapHandler}>
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
