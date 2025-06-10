import React from 'react';
import { Pressable, Text, View, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import { runOnJS, useSharedValue } from "react-native-reanimated";
import { router } from "expo-router";

import { icons } from "@/src/shared/constants";


const sideMenuButtons = [
    { text: "Categories", icon: icons.categories, route: () => router.push("/categories") },
    { text: "Tasks", icon: icons.tasks, route: () => router.push("/tasks") },
    { text: "Settings", icon: icons.settings, route: () => router.push("/settings") },
];


const SideMenu = ({ onClose }: { onClose: () => void }) => {
    const translationX = useSharedValue(0);

    const panGesture = Gesture.Pan()
        .onUpdate((event) => {
            translationX.value = event.translationX;
        })
        .onEnd((event) => {
            if (event.translationX > 60) {
                runOnJS(onClose)();
            }
        });

    return (
        <View className="flex-row w-full h-full" collapsable={false}>
            <Pressable className="flex-1" onPress={onClose} />

            <GestureHandlerRootView style={{flex: 1.5}}>
                <GestureDetector gesture={panGesture}>
                    <View className="h-full px-5 py-14 bg-dark-100 rounded-bl-[48px] rounded-tl-[48px] gap-8">
                        <View className="items-center flex-row justify-between pr-1 pt-1">
                            <Text className="font-inter_bold text-2xl tracking-widest text-light-100">Menu</Text>

                            <TouchableOpacity onPress={onClose}>
                                <Image source={icons.plus} className="size-7 rotate-45" tintColor="#efeff9" />
                            </TouchableOpacity>
                        </View>

                        <View className="gap-3">
                            {sideMenuButtons.map(({ text, icon, route }) => (
                                <SideMenuButton key={text} text={text} icon={icon} router={route} onClose={onClose} />
                            ))}
                        </View>
                    </View>
                </GestureDetector>
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

const SideMenuButton = ({ text, icon, router, onClose }: SideMenuButtonProps) => {
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
};