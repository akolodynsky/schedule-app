import React, { memo, useEffect, useRef } from 'react';
import { View } from 'react-native';
import { useShallow } from "zustand/react/shallow";

import { CustomTextInput, ModalInput, ErrorModal } from "./ui";
import DatePickerInput from "./DatePickerInput";
import EventShortCard from "./EventShortCard";
import EventsModal from "./EventsModal";

import { useDateStore, useEventStore, useTaskStore } from "../stores";
import { loadEvents } from "../services/event";


const TaskForm = () => {
    const { name, setName, error, setError } = useTaskStore(
        useShallow((state) => ({
            name: state.name,
            setName: state.setName,
            error: state.error,
            setError: state.setError,
        }))
    );

    const { events, selectedEvent, setSelectedEvent } = useEventStore(
        useShallow(state => ({
            events: state.events,
            selectedEvent: state.selectedEvent,
            setSelectedEvent: state.setSelectedEvent,
        }))
    );

    const { date, setSelectedDate } = useDateStore(
        useShallow((state) => ({
            date: state.date,
            setSelectedDate: state.setSelectedDate,
        }))
    );

    const prevDateRef = useRef(date);

    useEffect(() => {
        void loadEvents(date)
        setSelectedDate(date)
        if (date !== prevDateRef.current && selectedEvent) {
            const index = events.findIndex(e => e.id === selectedEvent.id)

            index === -1 && setSelectedEvent(null)
        }
    }, [date]);

    return (
        <>
            <ErrorModal error={error} setError={setError} />

            <View className="flex-1 pt-44 px-6 bg-dark-200">
                <CustomTextInput title={"Name"} value={name} setValue={setName} length={450} />

                <ModalInput
                    title="Events"
                    placeholder="Main Task"
                    renderContent={selectedEvent && (
                        <EventShortCard event={selectedEvent} remove={() => setSelectedEvent(null)} />
                    )}
                >
                    {({onClose}) => <EventsModal onClose={onClose} />}
                </ModalInput>

                <DatePickerInput />

            </View>
        </>

    );
};

export default memo(TaskForm);
