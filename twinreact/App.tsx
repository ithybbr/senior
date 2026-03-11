import { NavigationContainer, DarkTheme, DefaultTheme } from "@react-navigation/native";
import BottomTabs from "./src/navigation/BottomTabs";
import { ThemeProvider, useTheme } from "./src/theme/ThemeContext";

function RootNavigator() {
  const { mode } = useTheme();
  const navTheme = mode === "dark" ? DarkTheme : DefaultTheme;

  return (
    <NavigationContainer theme={navTheme}>
      <BottomTabs />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <RootNavigator />
    </ThemeProvider>
  );
}
