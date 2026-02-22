import { NavigationProp } from "@react-navigation/native";
import React from "react";
import PlaceForm from "../components/Place/PlaceForm";
import { RootStackParamList } from "../configs/types";
import { Place } from "../models/place";
import { insertPlace } from "../utils/database";

interface AddPlaceScreenProps {
  navigation: NavigationProp<RootStackParamList, "AddPlace">;
}

const AddPlaceScreen: React.FC<AddPlaceScreenProps> = ({ navigation }) => {
  const savePlaceHandler = async (place: Place) => {
    await insertPlace(place);
    navigation.navigate("AllPlaces", { place });
  };

  return <PlaceForm onSavePlace={savePlaceHandler} />;
};

export default AddPlaceScreen;
