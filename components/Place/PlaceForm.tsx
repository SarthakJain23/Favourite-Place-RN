import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Location } from "../../configs/types";
import { Colors } from "../../constants/colors";
import { Place } from "../../models/place";
import { getAddress } from "../../utils/location";
import Button from "../ui/Button";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";

type PlaceFormState = {
  title: string;
  imageUri: string;
  location: Location | null;
  address: string;
};

interface PlaceFormProps {
  onSavePlace: (placeData: Place) => Promise<void>;
}

const PlaceForm: React.FC<PlaceFormProps> = ({ onSavePlace }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState<PlaceFormState>({
    title: "",
    imageUri: "",
    location: null,
    address: "",
  });

  const pickedTitleHandler = (text: string) => {
    setFormState((prev) => ({ ...prev, title: text }));
  };

  const pickedImageHandler = (imageUri: string) => {
    setFormState((prev) => ({ ...prev, imageUri }));
  };

  const pickedLocationHandler = async (location: Location) => {
    const address = await getAddress(location.latitude, location.longitude);
    setFormState((prev) => ({ ...prev, location, address }));
  };

  const savePlaceHandler = async () => {
    setIsSubmitting(true);
    try {
      if (
        !formState.title ||
        !formState.imageUri ||
        !formState.address ||
        !formState.location
      ) {
        return;
      }
      const place = new Place(
        formState.title,
        formState.imageUri,
        formState.address,
        formState.location,
      );
      await onSavePlace(place);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={formState.title}
          onChangeText={pickedTitleHandler}
        />
      </View>
      <ImagePicker onImagePicked={pickedImageHandler} />
      <LocationPicker onLocationPicked={pickedLocationHandler} />
      <Button
        text="Save Place"
        isLoading={isSubmitting}
        onPress={savePlaceHandler}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});

export default PlaceForm;
