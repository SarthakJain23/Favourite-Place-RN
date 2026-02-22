import { RouteProp, useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import PlaceList from "../components/Place/PlaceList";
import { RootStackParamList } from "../configs/types";
import { Colors } from "../constants/colors";
import { Place } from "../models/place";
import { fetchPlaces } from "../utils/database";

interface AllPlaceScreenProps {
  route: RouteProp<RootStackParamList, "AllPlaces">;
}

const AllPlaceScreen: React.FC<AllPlaceScreenProps> = ({ route }) => {
  const isFocused = useIsFocused();
  const [places, setPlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadPlaces = async () => {
    setIsLoading(true);
    try {
      const fetchedPlaces = await fetchPlaces();
      setPlaces(fetchedPlaces);
    } catch (error) {
      console.error("Failed to load places:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      loadPlaces();
    }
  }, [isFocused]);

  if (isLoading) {
    return (
      <ActivityIndicator
        size="large"
        color={Colors.primary500}
        style={styles.loadingContainer}
      />
    );
  }

  return <PlaceList places={places} />;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AllPlaceScreen;
