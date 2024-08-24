import { Colors } from "@/constants/Colors";
import { View, StyleSheet, RefreshControl, FlatList } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useCallback, useEffect, useState } from "react";
import DeviceCard from "@/components/DeviceCard";

type Device = {
   id: number;
   device_name: string;
   device_type: string;
   state: boolean;
   place: string;
   device_metadata: Object;
};

export default function Room() {
   const router = useRouter();
   const { devices } = useLocalSearchParams();
   let parsedDevices: Device[] = [];

   if (devices) {
      const devicesString = Array.isArray(devices) ? devices[0] : devices;
      parsedDevices = JSON.parse(devicesString) as Device[];
   }

   const [refreshing, setRefreshing] = useState<boolean>(false);

//    const [devices, setDevices] = useState<string[]>([]);

   const onRefresh = useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
         setRefreshing(false);
      }, 2000);
   }, []);

//    const getDevices = async () => {
//       try {
//          const response = await axios.get(
//             "http://localhost:8000/v1/device/all"
//          );
//          const data = await response.data.results;
//         //  setDevices(Object.keys(data));
//          console.log(data);
//       } catch (error) {
//          console.error(error);
//       }
//    };

   useEffect(() => {
    //   getDevices();
      console.log("Devices: ", parsedDevices);
   }, []);

   return (
      <SafeAreaView
         style={{ flex: 1, backgroundColor: Colors.light.background }}
      >
         <FlatList
            data={parsedDevices}
            renderItem={({ item }) => (
               <DeviceCard
                  title={item.device_name}
                  onPress={() => {
                     router.push({
                        pathname: "/home/device",
                        params: {
                           device_id: item.id,
                           device: JSON.stringify(item),
                        },
                     });
                  }}
               />
            )}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            refreshControl={
               <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
            contentContainerStyle={styles.container}
            // ListFooterComponent={
            //    <View style={{ height: 16, padding: 8 }}>
            //       <Text>Footer</Text>
            //    </View>
            // }
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
