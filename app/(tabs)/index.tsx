import { Colors } from "@/constants/Colors";
import {
   View,
   Text,
   StyleSheet,
   RefreshControl,
   ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useCallback, useState } from "react";

export default function Home() {
   const [refreshing, setRefreshing] = useState(false);

   const onRefresh = useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
         setRefreshing(false);
      }, 2000);
   }, []);

   return (
      <SafeAreaView
         style={{ flex: 1, backgroundColor: Colors.light.background }}
      >
         <ScrollView
            refreshControl={
               <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
         >
            <View style={styles.container}>
               <Text>Dashboard screen.</Text>
            </View>
         </ScrollView>
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
   },
});
