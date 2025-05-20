import React from "react";
import {View, Image, ScrollView, Pressable} from 'react-native';
import {Link, router} from "expo-router";
import {GestureHandlerRootView, PanGestureHandler} from "react-native-gesture-handler";

import {icons} from "@/src/shared/constants/icons";
import {useLoadData, useGestureScroll} from "../../shared/hooks";
import EventList from "../components/EventList";
import EventBottomSheet from "../components/EventBottomSheet";
import DayList from "../components/DayList";
import SideMenuModal from "@/src/presentation/components/ui/SideMenuModal";


export default function HomePage() {
    useLoadData();

    const { scrollViewRef, onGestureEvent } = useGestureScroll();

    return (
        <>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <ScrollView
                    ref={scrollViewRef}
                    showsVerticalScrollIndicator={false}
                    className="bg-dark-200"
                    contentContainerStyle={{ flexGrow: 1 }}
                    scrollEventThrottle={16}
                    overScrollMode="never"
                >
                    <SideMenuModal />

                    <DayList />

                    <PanGestureHandler
                        simultaneousHandlers={scrollViewRef}
                        activeOffsetX={[-20, 20]}
                        activeOffsetY={[-20, 20]}
                        onHandlerStateChange={onGestureEvent}
                    >
                        <View className="bg-dark-100 flex-1">
                            <View className="py-10 px-6 flex-1 bg-dark-200 rounded-tr-[76px]">
                                <EventList />
                            </View>
                        </View>
                    </PanGestureHandler>
                </ScrollView>

                <EventBottomSheet />

            </GestureHandlerRootView>


            <Pressable
                onPress={() => router.push("/create")}
                className="absolute bottom-8 right-8 z-10 bg-primary rounded-full p-3"
            >
                <Image source={icons.add} className="size-12" />
            </Pressable>
        </>
    );
}
