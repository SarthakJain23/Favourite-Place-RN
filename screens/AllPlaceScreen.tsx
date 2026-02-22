import { RouteProp, useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import PlaceList from "../components/Place/PlaceList";
import { RootStackParamList } from "../configs/types";
import { Place } from "../models/place";

interface AllPlaceScreenProps {
  route: RouteProp<RootStackParamList, "AllPlaces">;
}

const AllPlaceScreen: React.FC<AllPlaceScreenProps> = ({ route }) => {
  const isFocused = useIsFocused();
  const [places, setPlaces] = useState<Place[]>([]);
  const { place } = route.params || {};

  useEffect(() => {
    if (isFocused && place) {
      setPlaces((prevPlaces) => [...prevPlaces, place]);
    }
  }, [isFocused, place]);

  return <PlaceList places={places} />;
};

export default AllPlaceScreen;
