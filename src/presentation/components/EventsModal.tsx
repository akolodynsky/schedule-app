import React, { memo } from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import { useShallow } from "zustand/react/shallow";

import EventShortCard from "./EventShortCard";
import { CustomModal } from "./ui";

import { useEventStore } from "../stores";
import {colors, fonts} from "@/src/shared/constants";
import {moderateScale} from "react-native-size-matters";


const EventsModal = memo(({ onClose }: { onClose: () => void }) => {
    const { events, setSelectedEvent } = useEventStore(
        useShallow(s => ({
            events: s.events,
            setSelectedEvent: s.setSelectedEvent,
        }))
    );

    const selectEvent = (event: IEvent) => {
        setSelectedEvent(event);
        onClose();
    };

    const filteredEvents: IEvent[] = events.filter((e): e is IEvent => !e.id.startsWith("g"))

    return (
        <CustomModal title="Events">
            {filteredEvents.length > 0
                ? filteredEvents.map((event) => (
                    <TouchableOpacity key={event.id} onPress={() => selectEvent(event)}>
                        <EventShortCard event={event} />
                    </TouchableOpacity>
                ))
                : <Text style={styles.text}>No events available...</Text>
            }
        </CustomModal>
    );
});

export default memo(EventsModal);



const styles = StyleSheet.create({
    text: {
        color: colors.light_300,
        fontFamily: fonts.inter_medium,
        fontSize: moderateScale(13),
        alignSelf: 'center'
    }
});