import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import IconButton from "./components/ui/IconButton";
import AddPlaceScreen from "./screens/AddPlaceScreen";
import AllPlaceScreen from "./screens/AllPlaceScreen";

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaceScreen}
            options={({ navigation }) => ({
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon="add"
                  size={24}
                  color={tintColor!}
                  onPress={() => navigation.navigate("AddPlace")}
                />
              ),
            })}
          />
          <Stack.Screen name="AddPlace" component={AddPlaceScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
