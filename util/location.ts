export const getMapPreview = (latitude: number, longitude: number) => {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${latitude},${longitude}&key=${process.env.EXPO_PUBLIC_MAPS_API_KEY}`;
  return imagePreviewUrl;
};
