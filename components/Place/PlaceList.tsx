import { NavigationProp, useNavigation } from "@react-navigation/native";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Place, RootStackParamList } from "../../configs/types";
import { Colors } from "../../constants/colors";
import PlaceItem from "./PlaceItem";

interface PlaceListProps {
  places: Place[];
}

const PlaceList: React.FC<PlaceListProps> = ({ places }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places found. Maybe start adding some?
        </Text>
      </View>
    );
  }

  const onPressPlaceItemHandler = (placeId: number) => {
    navigation.navigate("PlaceDetail", { placeId });
  };

  return (
    <FlatList
      data={places}
      style={styles.list}
      renderItem={(itemData) => (
        <PlaceItem place={itemData.item} onPress={onPressPlaceItemHandler} />
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});

export default PlaceList;
