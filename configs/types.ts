export type Location = {
  latitude: number;
  longitude: number;
};

export type RootStackParamList = {
  AllPlaces: undefined;
  AddPlace: { pickedLocation: Location } | undefined;
  Map: { pickedLocation: Location } | undefined;
};
