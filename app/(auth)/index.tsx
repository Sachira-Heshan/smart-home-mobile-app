import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Colors } from "@/constants/Colors";

export default function Onboarding() {
   return (
      <View style={styles.container}>
         <Image
            source={{
               uri: "https://drive.google.com/uc?export=view&id=1iM5bZL_yv79-c243010k8wR33GjjTlrr",
            }}
            style={styles.image}
            resizeMode="cover"
         />
         <Text>Onboarding!</Text>
         <Link href={"/(auth)/login"} style={styles.button}>Login</Link>
         <Link href={"/(auth)/register"}>Register</Link>
         <Link href={"/(tabs)"}>Dashboard</Link>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: Colors.light.background,
      padding: 16
   },
   image: {
      width: 250,
      height: 250,
      marginBottom: 80
   },
   button: {
      width: "100%",
      paddingVertical: 12,
      textAlign: "center",
      backgroundColor: Colors.light.buttonBackground,
      color: Colors.light.buttonText,
      borderRadius: 4,
      marginVertical: 4
   },
});
