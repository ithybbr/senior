import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AboutScreen from "../screens/AboutScreen";
import PcScreen from "../screens/PcScreen";
import SensorScreen from "../screens/SensorScreen";
import _2dScreen from "../screens/2dScreen";

const Tab = createBottomTabNavigator();

const icons = {
  About: require("../assets/icons/about.png"),
  Pcs: require("../assets/icons/pcs.jpg"),
  Sensors: require("../assets/icons/sensors.png"),
  "3D": require("../assets/icons/3d.jpg"),
};

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => (
          <Image
            source={icons[route.name as keyof typeof icons]}
            style={{ width: size, height: size, opacity: focused ? 1 : 0.6 }}
            resizeMode="contain"
          />
        ),
        tabBarStyle: {
          backgroundColor: "#111",
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 14,
        },
        tabBarActiveTintColor: "#4CAF50",
      })}
    >
      <Tab.Screen name="About" component={AboutScreen} />
      <Tab.Screen name="Pcs" component={PcScreen} />
      <Tab.Screen name="Sensors" component={SensorScreen} />
      <Tab.Screen name="2D Map" component={_2dScreen} />
    </Tab.Navigator>
  );
}
