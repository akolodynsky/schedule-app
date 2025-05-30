import React, {memo} from 'react';
import {router} from "expo-router";
import {useShallow} from "zustand/react/shallow";

import EventCard from "@/src/presentation/components/EventCard";
import {useEventStore} from "../stores";


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
            <>
                {events.map((event, index) => (
                    <EventCard
                        key={event.id}
                        {...event}
                        first={index}
                        handlePress={() => handlePress(event)}
                    />
                ))}
            </>
        )
};

export default memo(EventList);
