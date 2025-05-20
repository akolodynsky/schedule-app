import 'react-native-gesture-handler';
import 'react-native-reanimated';

import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import {Easing, StatusBar} from 'react-native';

import SplashScreenView from "@/src/presentation/components/ui/SplashScreenView";
import {useAppLoading} from "../../shared/hooks";
import EventCreate from "@/src/presentation/screens/EventCreate";
import TaskPage from "@/src/presentation/screens/TaskPage";
import CategoryPage from "@/src/presentation/screens/CategoryPage";
import TaskCreate from "@/src/presentation/screens/TaskCreate";
import CategoryCreate from "@/src/presentation/screens/CategoryCreate";
import HomePage from "@/src/presentation/screens/HomePage";


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
                <Stack.Screen name="home" component={HomePage} options={{ animation: "none", detachPreviousScreen: false }} />
                <Stack.Screen name="categories" component={CategoryPage} options={{ animation: "none", detachPreviousScreen: false }} />
                <Stack.Screen name="tasks" component={TaskPage} options={{ animation: "none", detachPreviousScreen: false }} />
                <Stack.Screen name="create" component={EventCreate} options={rightOptions}/>
                <Stack.Screen name="category" component={CategoryCreate} options={rightOptions}/>
                <Stack.Screen name="task" component={TaskCreate} options={rightOptions}/>
            </Stack.Navigator>
        </>
    );
};
