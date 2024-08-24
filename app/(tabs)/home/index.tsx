import { Colors } from "@/constants/Colors";
import { View, StyleSheet, RefreshControl, FlatList } from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useCallback, useEffect, useState } from "react";
import RoomCard from "@/components/RoomCard";

type Device = {
   id: number;
   device_name: string;
   device_type: string;
   state: boolean;
   place: string;
   device_metadata: Object;
}

type Room = {
   [key: string]: Device[];
};

export default function Home() {
   const router = useRouter();

   const [refreshing, setRefreshing] = useState(false);

   const [rooms, setRooms] = useState<string[]>([]);
   const [data, setData] = useState<Room>({});

   const onRefresh = useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
         setRefreshing(false);
      }, 2000);
   }, []);

   const getRooms = async () => {
      try {
         const response = await axios.get(
            "http://localhost:8000/v1/device/all"
         );
         const data = await response.data.results;
         setRooms(Object.keys(data))
         setData(data);
         console.log("Data: ", data);
         console.log("Rooms: ", rooms);
      } catch (error) {
         console.error(error);
      }
   };

   useEffect(() => {
      getRooms();
   }, []);

   return (
      <SafeAreaView
         style={{ flex: 1, backgroundColor: Colors.light.background }}
      >
         <FlatList
            data={rooms}
            renderItem={({ item }) => (
               <RoomCard
                  title={item}
                  onPress={() => {
                     console.log("Item: ", item);
                     router.push({
                        pathname: "/home/room",
                        params: {
                           devices: JSON.stringify(data[item]),
                        },
                     });
                  }}
               />
            )}
            keyExtractor={(item, index) => item}
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
