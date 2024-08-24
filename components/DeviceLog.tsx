import { Colors } from "@/constants/Colors";
import { View, Text, StyleSheet, Pressable } from "react-native";

type DeviceCardProps = {
   title: string;
};

export default function DeviceLog({ title }: DeviceCardProps) {
   return (
      <Pressable style={styles.container}>
         <View>
            <Text>{title}</Text>
         </View>
      </Pressable>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
      borderWidth: 1,
      borderRadius: 8,
      margin: 8,
      height: 50,
   },
});
