import React, {memo} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {useShallow} from "zustand/react/shallow";

import EventShortCard from "@/src/presentation/components/EventShortCard";
import CustomModal from "@/src/presentation/components/ui/CustomModal";
import {useEventStore} from "../stores";


const EventsModal = memo(({onClose}: {onClose: () => void}) => {
    const { events, setSelectedEvent } = useEventStore(
        useShallow(state => ({
            events: state.events,
            setSelectedEvent: state.setSelectedEvent,
        }))
    );

    const selectCategory = (event: IEvent) => {
        setSelectedEvent(event);
        onClose();
    }

    const filteredEvents: IEvent[] = events.filter((e): e is IEvent => !e.id.startsWith("g"))

    return (
        <CustomModal title="Events">
            {filteredEvents.length > 0
                ? filteredEvents.map((event) => (
                    <TouchableOpacity key={event.id} onPress={() => selectCategory(event)}>
                        <EventShortCard event={event} />
                    </TouchableOpacity>
                ))
                : <Text className="font-inter_medium text-light-300 self-center text-sm">No events available...</Text>
            }
        </CustomModal>
    );
});

export default EventsModal;
