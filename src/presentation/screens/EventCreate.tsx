import React, {useRef} from 'react';
import {router} from "expo-router";
import {useShallow} from "zustand/react/shallow";

import PageRouteButtons from "../components/ui/PageRouteButtons";
import PageHeader from "../components/ui/PageHeader";
import EventForm from "../components/EventForm";
import {useDateStore, useEventStore, useRecurringOptionsStore} from "../stores";
import {createEvent, removeEvent, updateEvent} from "../services/event";
import {AnimatedComponentRef} from "@/src/presentation/components/ui/AnimatedComponent";
import {WarnModal} from "@/src/presentation/components/ui/WarnModal";


export default function EventCreate()  {
    const {reset, selectedEvent} = useEventStore(
        useShallow((state) => ({
            reset: state.reset,
            selectedEvent: state.selectedEvent,
        }))
    );

    const {setDate, selectedDate} = useDateStore(
        useShallow((state) => ({
            setDate: state.setDate,
            selectedDate: state.selectedDate,
        }))
    );

    const {disabled, resetRecurring} = useRecurringOptionsStore(
        useShallow((state) => ({
            disabled: state.disabled,
            resetRecurring: state.resetRecurring,
        }))
    );

    const handleAddEvent = async () => {
        !selectedEvent
            ? await createEvent()
            : await updateEvent(selectedEvent);
    };

    const warnModalRef = useRef<AnimatedComponentRef>(null);

    const handleRemoveRecurringEvents = async () => {
        if (selectedEvent?.recurringId) {
            await removeEvent(selectedEvent.recurringId);
            handleBack();
        }
    };

    const handleBack = () => {
        router.back();
        setDate(selectedDate);
        reset();
        resetRecurring();
    };

    const condition = selectedEvent && (selectedEvent?.recurringId && !disabled);

    const header = !selectedEvent
        ? "Add Event"
        : condition
            ? "Update All Events"
            : "Update Event";

    return (
        <>
            <PageRouteButtons
                selected={!!selectedEvent}
                handleBack={handleBack}
                handleAdd={handleAddEvent}
                handleRemove={condition ? () => warnModalRef.current!.open() : null}
            />

            <WarnModal
                ref={warnModalRef}
                title={"Deletion Warning!"}
                text={"You are about to delete the main recurring event. All future occurrences and their associated tasks will also be permanently deleted."}
                buttonText={"Delete"}
                onSubmit={() => handleRemoveRecurringEvents()}
                onClose={() => warnModalRef.current?.close()}
            />

            <PageHeader name={header} />
            <EventForm />
        </>
    );
};
