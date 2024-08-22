import { Text, View, StyleSheet } from "react-native";

export default function Devices() {
   return (
      <View style={styles.container}>
         <Text>Devices screen.</Text>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
   },
});
