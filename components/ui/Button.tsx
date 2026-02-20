import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/colors";

interface ButtonProps {
  text: string;
  onPress: () => Promise<void>;
}

const Button: React.FC<ButtonProps> = ({ text, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
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
