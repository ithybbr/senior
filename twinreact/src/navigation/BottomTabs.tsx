import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AboutScreen from "../screens/AboutScreen";
import PcScreen from "../screens/PcScreen";
import SensorScreen from "../screens/SensorScreen";
import _2dScreen from "../screens/2dScreen";
import { useTheme } from "../theme/ThemeContext";

const Tab = createBottomTabNavigator();

const icons = {
  About: require("../assets/icons/information.png"),
  Pcs: require("../assets/icons/computer.png"),
  Sensors: require("../assets/icons/sensor.png"),
  "2D Map": require("../assets/icons/2d.png"),
};

export default function BottomTabs() {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => (
          <Image
            source={icons[route.name as keyof typeof icons]}
            style={{ width: size, height: size }}
            resizeMode="contain"
          />
        ),
        tabBarStyle: {
          backgroundColor: theme.tabBarBackground,
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 14,
        },
        tabBarActiveTintColor: theme.tabActiveTint,
      })}
    >
      <Tab.Screen name="About" component={AboutScreen} />
      <Tab.Screen name="Pcs" component={PcScreen} />
      <Tab.Screen name="Sensors" component={SensorScreen} />
      <Tab.Screen name="2D Map" component={_2dScreen} />
    </Tab.Navigator>
  );
}
