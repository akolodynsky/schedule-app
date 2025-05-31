import React from 'react';
import {Pressable, Text, View, Image, TouchableOpacity, ImageSourcePropType} from 'react-native';
import {GestureHandlerRootView, PanGestureHandler, PanGestureHandlerGestureEvent} from "react-native-gesture-handler";
import {router} from "expo-router";

import {icons} from "@/src/shared/constants/icons";

const sideMenuButtons = [
    {text: "Categories", icon: icons.categories, route: () => router.push("/categories")},
    {text: "Tasks", icon: icons.tasks, route: () => router.push("/tasks")},
    {text: "Settings", icon: icons.settings, route: () => router.push("/settings")},
];


const SideMenu = ({onClose}: {onClose: () => void}) => {
    const onGestureEvent = (event: PanGestureHandlerGestureEvent) => {
        if (event.nativeEvent.state === 5 && event.nativeEvent.translationX > 60) onClose();
    };

    return (
        <View className="flex-row w-full h-full">
            <Pressable className="flex-1" onPress={onClose} />

            <GestureHandlerRootView style={{flex: 1.7}}>
                <PanGestureHandler onHandlerStateChange={onGestureEvent}>
                    <View className="h-full px-5 py-7 bg-dark-100 rounded-bl-[24px] rounded-tl-[24px]">
                        <Text className="font-inter_bold text-2xl text-light-100 self-center mb-6">SantiTime</Text>

                        <View className="gap-3">
                            {sideMenuButtons.map(({text, icon, route}) => (
                                <SideMenuButton key={text} text={text} icon={icon} router={route} onClose={onClose} />
                            ))}
                        </View>

                    </View>
                </PanGestureHandler>
            </GestureHandlerRootView>
        </View>
    );
};

export default SideMenu;



interface SideMenuButtonProps {
    text: string,
    icon: ImageSourcePropType,
    router: () => void,
    onClose: () => void
}

const SideMenuButton = ({text, icon, router, onClose}: SideMenuButtonProps) => {
    return (
        <TouchableOpacity
            onPress={() => {
                router();
                onClose();
            }}
            className="bg-dark-200 p-4 rounded-2xl flex-row items-center"
        >
            <Image source={icon} className="size-5 mr-2" />
            <Text className="font-inter_medium text-lg text-light-100">{text}</Text>
        </TouchableOpacity>
    )
}