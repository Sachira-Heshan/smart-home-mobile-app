import { Colors } from "@/constants/Colors";
import { View, StyleSheet, RefreshControl, FlatList, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useCallback, useEffect, useState } from "react";
import DeviceLog from "@/components/DeviceLog";

type Device = {
   id: number;
   device_name: string;
   device_type: string;
   state: boolean;
   place: string;
   device_metadata: Object;
};

type DeviceLogs = {
   log: string;
   device_id: number;
   action: string;
   timestamp: string;
   id: number;
};

export default function DeviceScreen() {
   const { device_id, device } = useLocalSearchParams();

   let parsedDevice: Device;

   if (device) {
      const deviceString = Array.isArray(device) ? device[0] : device;
      parsedDevice = JSON.parse(deviceString) as Device;
   }

   const [refreshing, setRefreshing] = useState<boolean>(false);

   const [deviceLogs, setDeviceLogs] = useState<DeviceLogs[]>([]);

   const onRefresh = useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
         setRefreshing(false);
      }, 2000);
   }, []);

   const getDeviceLogs = async () => {
      try {
         const response = await axios.get(
            `http://localhost:8000/v1/device_logs/get/${device_id}`
         );
         const data = await response.data.results;
         setDeviceLogs(data);
         console.log("Data: ", data);
      } catch (error) {
         console.error(error);
      }
   };

   useEffect(() => {
      getDeviceLogs();
      console.log("Device Data: ", parsedDevice);
   }, []);

   return (
      <SafeAreaView
         style={{ flex: 1, backgroundColor: Colors.light.background }}
      >
         <FlatList
            data={deviceLogs}
            renderItem={({ item }) => <DeviceLog title={item.log} />}
            keyExtractor={(item, index) => index.toString()}
            refreshControl={
               <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListHeaderComponent={() => (
               <View style={{ padding: 8, height: 8, marginBottom: 16 }}>
                  <Text>Header</Text>
               </View>
            )}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
               <View style={{ padding: 8 }}>
                  <Text>No logs found.</Text>
               </View>
            )}
            contentContainerStyle={styles.container}
         />
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 8,
      width: "100%",
   },
});
