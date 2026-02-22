import * as SQLite from "expo-sqlite";
import { DBPlace, Place } from "../configs/types";

export const init = async () => {
  const db = await SQLite.openDatabaseAsync("places.db");
  await db.execAsync(`CREATE TABLE IF NOT EXISTS places (
    id INTEGER PRIMARY KEY NOT NULL,
    title TEXT NOT NULL,
    imageUri TEXT NOT NULL,
    address TEXT NOT NULL,
    latitude REAL NOT NULL,
    longitude REAL NOT NULL
  )`);
};

export const insertPlace = async (place: Place) => {
  const db = await SQLite.openDatabaseAsync("places.db");
  const { title, imageUri, address, location } = place;
  const { latitude, longitude } = location;
  await db.runAsync(
    `INSERT INTO places (title, imageUri, address, latitude, longitude) VALUES (?, ?, ?, ?, ?)`,
    title,
    imageUri,
    address,
    latitude,
    longitude,
  );
};

export const fetchPlaces = async (): Promise<Place[]> => {
  const db = await SQLite.openDatabaseAsync("places.db");
  const places = await db.getAllAsync<DBPlace>(`SELECT * FROM places`);
  return places.map((dbPlace) => ({
    id: dbPlace.id,
    title: dbPlace.title,
    imageUri: dbPlace.imageUri,
    address: dbPlace.address,
    location: {
      latitude: dbPlace.latitude,
      longitude: dbPlace.longitude,
    },
  }));
};

export const fetchPlaceDetails = async (id: number): Promise<Place | null> => {
  const db = await SQLite.openDatabaseAsync("places.db");
  const fetchedPlace = await db.getFirstAsync<DBPlace>(
    `SELECT * FROM places WHERE id = ?`,
    id,
  );
  if (!fetchedPlace) {
    return null;
  }
  const place: Place = {
    id: fetchedPlace.id,
    title: fetchedPlace.title,
    imageUri: fetchedPlace.imageUri,
    address: fetchedPlace.address,
    location: {
      latitude: fetchedPlace.latitude,
      longitude: fetchedPlace.longitude,
    },
  };
  return place;
};
