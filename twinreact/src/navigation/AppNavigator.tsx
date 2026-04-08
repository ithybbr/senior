import { NavigationContainer, DarkTheme, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/HomeScreen";
import Sensor from "../screens/SensorScreen";
import Pc from "../screens/PcScreen";
import Ml from "../screens/MlScreen";
import { ThemeProvider, useTheme } from "../theme/ThemeContext";

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const { mode } = useTheme();

  const navTheme = mode === "dark" ? DarkTheme : DefaultTheme;

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Sensor" component={Sensor} />
        <Stack.Screen name="Pc" component={Pc} />
        <Stack.Screen name="Ml" component={Ml} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function AppNavigator() {
  return (
    <ThemeProvider>
      <RootNavigator />
    </ThemeProvider>
  );
}
