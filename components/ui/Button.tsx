import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/colors";

interface ButtonProps {
  text: string;
  isLoading?: boolean;
  onPress: () => Promise<void>;
}

const Button: React.FC<ButtonProps> = ({
  text,
  isLoading = false,
  onPress,
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        isLoading && styles.loading,
      ]}
      onPress={onPress}
      disabled={isLoading}
    >
      {isLoading && (
        <Ionicons name="hourglass" size={24} color={Colors.primary50} />
      )}
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 4,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.15,
    borderRadius: 4,
  },
  loading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary500,
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    color: Colors.primary50,
  },
});

export default Button;
