import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";
import { Formik } from "formik";
import {
   View,
   Text,
   StyleSheet,
   TextInput,
   Pressable,
   RefreshControl,
   ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useCallback, useState } from "react";
import * as yup from "yup";

const registerSchema = yup.object().shape({
    name: yup.string().required(),
   email: yup.string().email().required(),
   password: yup.string().required().min(8),
});

export default function Register() {
   const [refreshing, setRefreshing] = useState(false);

   const onRefresh = useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
         setRefreshing(false);
      }, 2000);
   }, []);

   type RegisterValues = {
        name: string,
      email: string;
      password: string;
   };

   const handleRegister = (values: RegisterValues) => {
      console.log(values);
   };

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
               <Text>Register screen.</Text>
               <Formik
                  initialValues={{ name: "", email: "", password: "" }}
                  onSubmit={handleRegister}
                  validationSchema={registerSchema}
               >
                  {({
                     handleChange,
                     handleBlur,
                     handleSubmit,
                     values,
                     errors,
                     touched,
                  }) => (
                     <View style={styles.formContainer}>
                        <TextInput
                           placeholder="Name"
                           onChangeText={handleChange("name")}
                           onBlur={handleBlur("name")}
                           value={values.name}
                           style={styles.textInput}
                        />
                        {errors.name && touched.name && (
                           <Text style={styles.errorText}>{errors.name}</Text>
                        )}
                        <TextInput
                           placeholder="Email"
                           onChangeText={handleChange("email")}
                           onBlur={handleBlur("email")}
                           value={values.email}
                           style={styles.textInput}
                        />
                        {errors.email && touched.email && (
                           <Text style={styles.errorText}>{errors.email}</Text>
                        )}
                        <TextInput
                           placeholder="Password"
                           onChangeText={handleChange("password")}
                           onBlur={handleBlur("password")}
                           value={values.password}
                           style={styles.textInput}
                           secureTextEntry
                        />
                        {errors.password && touched.password && (
                           <Text style={styles.errorText}>
                              {errors.password}
                           </Text>
                        )}
                        <Pressable
                           onPress={() => {
                              handleSubmit();
                           }}
                           android_ripple={{
                              color: "rgba(255, 255, 255, 0.15)",
                           }}
                           style={styles.button}
                        >
                           <Text style={styles.buttonText}>Register</Text>
                        </Pressable>
                     </View>
                  )}
               </Formik>
               <View>
                  <Text>Already have an account!</Text>
                  <Link href={"/(auth)/login"}>Login</Link>
               </View>
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
   formContainer: {
      flex: 1,
      width: "100%",
   },
   textInput: {
      borderRadius: 4,
      borderColor: Colors.light.border,
      borderWidth: 1,
      paddingVertical: 12,
      width: "100%",
      marginBottom: 8,
      paddingHorizontal: 12,
   },
   errorText: {
      color: Colors.light.errorText,
      marginBottom: 8,
   },
   button: {
      width: "100%",
      paddingVertical: 12,
      textAlign: "center",
      backgroundColor: Colors.light.buttonBackground,
      color: Colors.light.buttonText,
      borderRadius: 4,
      marginVertical: 4,
   },
   buttonText: {
      textAlign: "center",
      color: Colors.light.buttonText,
   },
});
