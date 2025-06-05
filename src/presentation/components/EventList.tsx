import React, { memo } from 'react';
import { View } from "react-native";
import { router } from "expo-router";
import { useShallow } from "zustand/react/shallow";

import EventCard from "./EventCard";

import { useEventStore } from "../stores";


const EventList = () => {
    const { events, setSelectedEvent, setStart, setEnd } = useEventStore(
        useShallow((state) => ({
            events: state.events,
            setSelectedEvent: state.setSelectedEvent,
            setStart: state.setStart,
            setEnd: state.setEnd,
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
        <View className="bg-dark-100 flex-1" collapsable={false}>
            <View className="py-10 px-6 flex-1 bg-dark-200 rounded-tr-[76px]" collapsable={false}>
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
