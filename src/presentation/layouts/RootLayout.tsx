import 'react-native-gesture-handler';
import 'react-native-reanimated';

import { createStackNavigator, CardStyleInterpolators, StackNavigationOptions } from '@react-navigation/stack';
import {Easing, StatusBar} from 'react-native';

import SplashScreenView from "@/src/presentation/components/ui/SplashScreenView";
import {useAppLoading} from "../../shared/hooks";
import EventCreate from "@/src/presentation/screens/EventCreate";
import TaskPage from "@/src/presentation/screens/TaskPage";
import CategoryPage from "@/src/presentation/screens/CategoryPage";
import TaskCreate from "@/src/presentation/screens/TaskCreate";
import CategoryCreate from "@/src/presentation/screens/CategoryCreate";
import HomePage from "@/src/presentation/screens/HomePage";
import SettingsPage from "@/src/presentation/screens/SettingsPage";


const Stack = createStackNavigator();

export default function RootLayout() {
    const appLoaded = useAppLoading();

    if (!appLoaded) return <SplashScreenView />;

    const config = {
        animation: 'timing' as const,
        config: {
            duration: 200,
            easing: Easing.ease,
        }
    };

    const defaultOptions: StackNavigationOptions = {
        animation: "none",
        detachPreviousScreen: false,
    }

    const rightOptions = {
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        detachPreviousScreen: false,
        cardStyle: { backgroundColor: "#1a1a24" },
        transitionSpec: {
            open: config,
            close: config,
        },
    };

    return (
        <>
            <StatusBar backgroundColor="transparent" translucent />
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="home" component={HomePage} options={defaultOptions} />
                <Stack.Screen name="categories" component={CategoryPage} options={defaultOptions} />
                <Stack.Screen name="tasks" component={TaskPage} options={defaultOptions} />
                <Stack.Screen name="settings" component={SettingsPage} options={defaultOptions} />
                <Stack.Screen name="create" component={EventCreate} options={rightOptions}/>
                <Stack.Screen name="category" component={CategoryCreate} options={rightOptions}/>
                <Stack.Screen name="task" component={TaskCreate} options={rightOptions}/>
            </Stack.Navigator>
        </>
    );
};
