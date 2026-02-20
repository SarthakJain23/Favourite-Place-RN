import axios from "axios";

export const getAddress = async (lat: number, lng: number) => {
  const { data } = await axios.get(
    "https://nominatim.openstreetmap.org/reverse",
    { params: { lat, lon: lng, format: "json" } },
  );
  return data.display_name;
};
