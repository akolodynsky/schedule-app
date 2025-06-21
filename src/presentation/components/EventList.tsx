import React, { memo } from 'react';
import { StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { useShallow } from "zustand/react/shallow";
import { moderateScale } from "react-native-size-matters";

import EventCard from "./EventCard";

import { useEventStore } from "../stores";
import { colors } from "@/src/shared/constants";


const EventList = () => {
    const { events, setSelectedEvent, setStart, setEnd } = useEventStore(
        useShallow((s) => ({
            events: s.events,
            setSelectedEvent: s.setSelectedEvent,
            setStart: s.setStart,
            setEnd: s.setEnd,
        }))
    );

    const handlePress = (event: IEvent | IGap) => {
        if (event.id.startsWith("g")) {
            router.push("/create");
            setStart(event.start);
            setEnd(event.end);
        } else {
            setSelectedEvent(event as IEvent);
        }
    };

    return (
        <View style={styles.backgroundContainer} collapsable={false}>
            <View style={styles.container} collapsable={false}>
                {events.map((event, index) => (
                    <EventCard
                        key={event.id}
                        {...event}
                        first={index}
                        handlePress={() => handlePress(event)}
                    />
                ))}
            </View>
        </View>
    )
};

export default memo(EventList);



const styles = StyleSheet.create({
    backgroundContainer: { backgroundColor: colors.dark_100, flex: 1 },
    container: {
        flex: 1,
        borderTopRightRadius: moderateScale(70),
        backgroundColor: colors.dark_200,
        paddingHorizontal: moderateScale(20),
        paddingVertical: moderateScale(34)
    }
});