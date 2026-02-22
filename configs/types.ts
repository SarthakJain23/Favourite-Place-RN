import { Place } from "../models/place";

export type Location = {
  latitude: number;
  longitude: number;
};

export type RootStackParamList = {
  AllPlaces: { place: Place } | undefined;
  AddPlace: { pickedLocation: Location } | undefined;
  Map: { pickedLocation: Location } | undefined;
};
