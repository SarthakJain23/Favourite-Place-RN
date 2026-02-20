export type Location = {
  latitude: number;
  longitude: number;
};

export type RootStackParamList = {
  AddPlace: { pickedLocation: Location } | undefined;
  Map: undefined;
};
