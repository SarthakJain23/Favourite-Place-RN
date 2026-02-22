import * as SQLite from "expo-sqlite";
import { Place } from "../models/place";

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
  const { title, imageUri, address, location } = place.getPlaceData();
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
  const places = await db.getAllAsync(`SELECT * FROM places`);
  return places as Place[];
};

export const fetchPlaceDetails = async (id: number): Promise<Place | null> => {
  const db = await SQLite.openDatabaseAsync("places.db");
  const place = await db.getFirstAsync(`SELECT * FROM places WHERE id = ?`, id);
  return place as Place;
};
