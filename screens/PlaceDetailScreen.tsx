import { RouteProp } from "@react-navigation/native";
import { useEffect } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import OutlineButton from "../components/ui/OutlineButton";
import { RootStackParamList } from "../configs/types";
import { Colors } from "../constants/colors";

interface PlaceDetailScreenProps {
  route: RouteProp<RootStackParamList, "PlaceDetail">;
}

const PlaceDetailScreen: React.FC<PlaceDetailScreenProps> = ({ route }) => {
  const placeId = route.params.placeId;
  const onPressViewOnMapHandler = () => {};

  useEffect(() => {}, [placeId]);

  return (
    <ScrollView>
      <Image
        style={styles.image}
        source={{ uri: "https://placehold.co/600x400" }}
      />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>ADDRESS</Text>
        </View>
        <OutlineButton icon="map" onPress={onPressViewOnMapHandler}>
          View on Map
        </OutlineButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default PlaceDetailScreen;
