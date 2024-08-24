import { Colors } from "@/constants/Colors";
import { View, Text, StyleSheet, Pressable } from "react-native";

type RoomCardProps = {
    title: string;
    onPress: () => void;
};

export default function RoomCard({title, onPress}: RoomCardProps) {
   return (
      <Pressable style={styles.container} onPress={onPress}>
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
      height: 140,
   },
});