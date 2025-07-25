import React, { memo, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useShallow } from "zustand/react/shallow";
import { moderateScale } from "react-native-size-matters";

import { CustomTextInput, ModalInput, ErrorModal } from "./ui";
import DatePickerInput from "./DatePickerInput";
import EventShortCard from "./EventShortCard";
import { DefaultCard } from "./CategoryCard";
import EventsModal from "./EventsModal";

import { useDateStore, useEventStore, useTaskStore } from "../stores";
import { loadEvents } from "../services/event";
import { colors } from "@/src/shared/constants";


const TaskForm = () => {
    const { events, selectedEvent, setSelectedEvent } = useEventStore(
        useShallow(s => ({
            events: s.events,
            selectedEvent: s.selectedEvent,
            setSelectedEvent: s.setSelectedEvent,
        }))
    );

    const { date, setSelectedDate } = useDateStore(
        useShallow((s) => ({
            date: s.date,
            setSelectedDate: s.setSelectedDate,
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
            <ErrorSection />

            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                overScrollMode="never"
            >
                <NameInput />

                <ModalInput
                    title="Event"
                    renderContent={selectedEvent
                        ? <EventShortCard event={selectedEvent} remove={() => setSelectedEvent(null)} />
                        : <DefaultCard />
                    }
                >
                    {({onClose}) => <EventsModal onClose={onClose} />}
                </ModalInput>

                <DatePickerInput align='left' />
            </ScrollView>
        </>

    );
};

export default memo(TaskForm);



const ErrorSection = () => {
    const error = useTaskStore((s) => s.error);
    const setError = useTaskStore((s) => s.setError);

    return <ErrorModal error={error} setError={setError} />;
};


const NameInput = () => {
    const name = useTaskStore((s) => s.name);
    const setName = useTaskStore((s) => s.setName);

    return <CustomTextInput title="Name" value={name} setValue={setName} length={450} />;
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: moderateScale(22),
        backgroundColor: colors.dark_200
    },
    contentContainer: {
        paddingBottom: moderateScale(30),
        paddingTop: moderateScale(148),
        gap: moderateScale(18)
    }
});