import { RouteProp, useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import PlaceList from "../components/Place/PlaceList";
import Loader from "../components/ui/Loader";
import { Place, RootStackParamList } from "../configs/types";
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
    return <Loader />;
  }

  return <PlaceList places={places} />;
};

export default AllPlaceScreen;
