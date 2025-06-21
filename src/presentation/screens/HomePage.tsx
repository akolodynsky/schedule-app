import React from "react";
import { ScrollView } from 'react-native';
import { GestureHandlerRootView, GestureDetector } from "react-native-gesture-handler";

import { AddButton, SideMenuModal } from "../components/ui";
import DayList from "../components/DayList";
import EventList from "../components/EventList";
import EventBottomSheet from "../components/EventBottomSheet";

import { useGestureScroll } from "@/src/shared/hooks";
import { colors } from '@/src/shared/constants';


export default function HomePage() {
    const { panGesture } = useGestureScroll();

    return (
        <>
            <GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.dark_200 }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
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
