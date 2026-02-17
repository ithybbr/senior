import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AboutScreen from "../screens/AboutScreen";
import PcScreen from "../screens/PcScreen";
import SensorScreen from "../screens/SensorScreen";
import _3dScreen from "../screens/3dScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
            backgroundColor: "#111",
            height: 70
        },
        tabBarLabelStyle: {
            fontSize: 14
        },
        tabBarActiveTintColor: "#4CAF50",
      }}
    >
      <Tab.Screen name="About" component={AboutScreen} />
      <Tab.Screen name="Pcs" component={PcScreen} />
      <Tab.Screen name="Sensors" component={SensorScreen} />
      <Tab.Screen name="3D" component={_3dScreen} />
    </Tab.Navigator>
  );
}
