import 'react-native-gesture-handler';
import 'react-native-reanimated';

import React from "react";
import { Easing, StatusBar } from 'react-native';
import { createStackNavigator, CardStyleInterpolators, StackNavigationOptions } from '@react-navigation/stack';

import { SplashScreenView } from "../components/ui";
import EventCreate from "../screens/EventCreate";
import TaskPage from "../screens/TaskPage";
import CategoryPage from "../screens/CategoryPage";
import TaskCreate from "../screens/TaskCreate";
import CategoryCreate from "../screens/CategoryCreate";
import HomePage from "../screens/HomePage";
import SettingsPage from "../screens/SettingsPage";

import { useAppLoading } from "@/src/shared/hooks";


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
