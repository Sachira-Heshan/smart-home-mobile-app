import { AuthProvider } from "@/contexts/AuthContext";
import { Tabs, Stack } from "expo-router";

export default function RootLayout() {
  return (
     <AuthProvider>
        <Stack>
           <Stack.Screen name="(auth)" options={{ headerShown: false }} />
           <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
     </AuthProvider>
  );
}
