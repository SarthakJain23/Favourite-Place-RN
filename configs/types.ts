export type Location = {
  latitude: number;
  longitude: number;
};

export type RootStackParamList = {
  AllPlaces: undefined;
  PlaceDetail: { placeId: number };
  AddPlace: { pickedLocation: Location } | undefined;
  Map: { pickedLocation: Location } | undefined;
};
