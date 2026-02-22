import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const Loader: React.FC = () => {
  return (
    <ActivityIndicator
      size="large"
      color={Colors.primary500}
      style={styles.loadingContainer}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loader;
