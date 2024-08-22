import { Stack } from "expo-router";

export default function AuthLayout () {
    return (
        <Stack screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="index" options={{  }} />
            <Stack.Screen name="login" options={{ headerTitle: "Login" }} />
            <Stack.Screen name="register" options={{ headerTitle: "Register" }} />
        </Stack>
    )
}