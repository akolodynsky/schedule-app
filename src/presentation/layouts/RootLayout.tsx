import 'react-native-gesture-handler';
import 'react-native-reanimated';

import React, { useCallback } from "react";
import { Easing, StatusBar, View } from 'react-native';
import { createStackNavigator, CardStyleInterpolators, StackNavigationOptions } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';

import EventCreate from "../screens/EventCreate";
import TaskPage from "../screens/TaskPage";
import CategoryPage from "../screens/CategoryPage";
import TaskCreate from "../screens/TaskCreate";
import CategoryCreate from "../screens/CategoryCreate";
import HomePage from "../screens/HomePage";
import SettingsPage from "../screens/SettingsPage";

import { useAppLoading } from "@/src/shared/hooks";
import { colors } from "@/src/shared/constants";


const Stack = createStackNavigator();

export default function RootLayout() {
    const appLoaded = useAppLoading();

    const onLayoutRootView = useCallback(async () => {
        if (appLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [appLoaded]);

    if (!appLoaded) return null;

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
        cardStyle: { backgroundColor: colors.dark_100 },
        transitionSpec: {
            open: config,
            close: config,
        },
    };

    return (
        <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
            <StatusBar backgroundColor="transparent" translucent barStyle="light-content" />
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="home" component={HomePage} options={defaultOptions} />
                <Stack.Screen name="categories" component={CategoryPage} options={defaultOptions} />
                <Stack.Screen name="tasks" component={TaskPage} options={defaultOptions} />
                <Stack.Screen name="settings" component={SettingsPage} options={defaultOptions} />
                <Stack.Screen name="create" component={EventCreate} options={rightOptions}/>
                <Stack.Screen name="category" component={CategoryCreate} options={rightOptions}/>
                <Stack.Screen name="task" component={TaskCreate} options={rightOptions}/>
            </Stack.Navigator>
        </View>
    );
};
