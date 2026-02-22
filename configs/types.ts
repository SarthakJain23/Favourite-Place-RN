export type DBPlace = {
  id: number;
  title: string;
  imageUri: string;
  address: string;
  latitude: number;
  longitude: number;
};

export type Location = {
  latitude: number;
  longitude: number;
};

export type Place = {
  id: number;
  title: string;
  imageUri: string;
  address: string;
  location: Location;
};

export type RootStackParamList = {
  AllPlaces: undefined;
  PlaceDetail: { placeId: number };
  AddPlace: { pickedLocation: Location } | undefined;
  Map: { pickedLocation: Location } | undefined;
};
