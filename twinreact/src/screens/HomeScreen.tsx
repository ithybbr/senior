import { View, Text } from "react-native";
import Header from "../components/Header";
import { useTheme } from "../theme/ThemeContext";

export default function HomeScreen() {
  const { theme } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.screenBackground }}>
      <Header />
      <Text>Home</Text>
    </View>
  );
}