import { Tabs } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function TabLayout() {
   return (
      <Tabs
         initialRouteName="index"
         screenOptions={{
            headerTitleAlign: "center",
         }}
      >
         <Tabs.Screen
            name="index"
            options={{
               headerTitle: "Dashboard",
               title: "Home",
               tabBarIcon: ({ color }) => (
                  <MaterialIcons name="home" size={24} color={color} />
               ),
            }}
         />
         <Tabs.Screen
            name="devices"
            options={{
               headerTitle: "Devices",
               title: "Devices",
               tabBarIcon: ({ color }) => (
                  <MaterialIcons name="devices" size={24} color={color} />
               ),
            }}
         />
         <Tabs.Screen
            name="settings"
            options={{
               headerTitle: "Settings",
               title: "Settings",
               tabBarIcon: ({ color }) => (
                  <MaterialIcons name="settings" size={24} color={color} />
               ),
            }}
         />
      </Tabs>
   );
}
