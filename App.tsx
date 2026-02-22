import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import IconButton from "./components/ui/IconButton";
import { Colors } from "./constants/colors";
import AddPlaceScreen from "./screens/AddPlaceScreen";
import AllPlaceScreen from "./screens/AllPlaceScreen";
import MapScreen from "./screens/MapScreen";
import { init } from "./utils/database";

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

const App: React.FC = () => {
  const [isDbInitialized, setIsDbInitialized] = useState(false);

  const initializeDatabase = async () => {
    try {
      await init();
      setIsDbInitialized(true);
    } catch (error) {
      console.error("Failed to initialize database:", error);
    }
  };

  useEffect(() => {
    initializeDatabase();
  }, []);

  useEffect(() => {
    if (isDbInitialized) {
      SplashScreen.hideAsync();
    }
  }, [isDbInitialized]);

  if (!isDbInitialized) {
    return null;
  }

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 },
          }}
        >
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaceScreen}
            options={({ navigation }) => ({
              title: "Your Favorite Places",
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
          <Stack.Screen
            name="AddPlace"
            component={AddPlaceScreen}
            options={{
              title: "Add a New Place",
            }}
          />
          <Stack.Screen
            name="Map"
            component={MapScreen}
            options={{
              title: "Map",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
