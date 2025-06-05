import React from "react";
import { ScrollView } from 'react-native';
import { GestureHandlerRootView, GestureDetector } from "react-native-gesture-handler";

import { AddButton, SideMenuModal } from "../components/ui";
import DayList from "../components/DayList";
import EventList from "../components/EventList";
import EventBottomSheet from "../components/EventBottomSheet";

import { useGestureScroll } from "@/src/shared/hooks";


export default function HomePage() {
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
                        <EventList />
                    </GestureDetector>
                </ScrollView>
            </GestureHandlerRootView>

            <EventBottomSheet />

            <AddButton />
        </>
    );
}
