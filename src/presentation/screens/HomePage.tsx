import React from "react";
import { View, Image, ScrollView, Pressable } from 'react-native';
import { router } from "expo-router";
import { GestureHandlerRootView, GestureDetector } from "react-native-gesture-handler";

import { SideMenuModal } from "../components/ui";
import DayList from "../components/DayList";
import EventList from "../components/EventList";
import EventBottomSheet from "../components/EventBottomSheet";

import { icons } from "@/src/shared/constants";
import { useLoadData, useGestureScroll } from "@/src/shared/hooks";


export default function HomePage() {
    useLoadData();

    const { panGesture } = useGestureScroll();

    return (
        <>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    className="bg-dark-200"
                    contentContainerStyle={{ flexGrow: 1 }}
                    scrollEventThrottle={16}
                    overScrollMode="never"
                >
                    <SideMenuModal />

                    <DayList />

                    <GestureDetector gesture={panGesture}>
                        <View className="bg-dark-100 flex-1">
                            <View className="py-10 px-6 flex-1 bg-dark-200 rounded-tr-[76px]">
                                <EventList />
                            </View>
                        </View>
                    </GestureDetector>
                </ScrollView>
            </GestureHandlerRootView>

                <EventBottomSheet />



            <Pressable
                onPress={() => router.push("/create")}
                className="absolute bottom-8 right-8 z-10 bg-primary rounded-full p-3"
            >
                <Image source={icons.add} className="size-12" />
            </Pressable>
        </>
    );
}
