import 'react-native-reanimated';
import {Stack} from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import SplashScreenView from "@/src/presentation/components/ui/SplashScreenView";
import {useAppLoading} from "../../shared/hooks";


export default function RootLayout() {
    const appLoaded = useAppLoading();

    if (!appLoaded) return <SplashScreenView />;

    return (
        <>
            <StatusBar translucent />
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="create" options={{ headerShown: false }} />
                <Stack.Screen name="category" options={{ headerShown: false }} />
                <Stack.Screen name="task" options={{ headerShown: false }} />
                <Stack.Screen name="categories" options={{ headerShown: false }} />
                <Stack.Screen name="tasks" options={{ headerShown: false }} />
            </Stack>
        </>
    );
};
