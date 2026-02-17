import { FlatList, StyleSheet, Text, View } from "react-native";
import { Place } from "../../models/place";
import PlaceItem from "./PlaceItem";

interface PlaceListProps {
  places: Place[];
}

const PlaceList: React.FC<PlaceListProps> = ({ places }) => {
  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places found. Maybe start adding some?
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={places}
      renderItem={(itemData) => (
        <PlaceItem place={itemData.item} onPress={() => {}} />
      )}
      keyExtractor={(item) => item["id"]}
    />
  );
};

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
  },
});

export default PlaceList;
