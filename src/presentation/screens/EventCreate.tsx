import React, { useCallback, useRef } from 'react';
import { router } from "expo-router";
import { useFocusEffect } from "@react-navigation/core";
import { useShallow } from "zustand/react/shallow";

import { PageRouteButtons, PageHeader, AnimatedComponentRef, WarnModal } from "../components/ui";
import EventForm from "../components/EventForm";

import { useEventStore, useRecurringOptionsStore } from "../stores";
import { createEvent, removeEvent, updateEvent } from "../services/event";


export default function EventCreate()  {
    const {reset, selectedEvent} = useEventStore(
        useShallow((state) => ({
            reset: state.reset,
            selectedEvent: state.selectedEvent,
        }))
    );

    const {disabled, resetRecurring} = useRecurringOptionsStore(
        useShallow((state) => ({
            disabled: state.disabled,
            resetRecurring: state.resetRecurring,
        }))
    );

    const handleAddEvent = async () => {
        selectedEvent
            ? await updateEvent(selectedEvent)
            : await createEvent()
    };

    const handleRemoveRecurringEvents = async () => {
        if (selectedEvent?.recurringId) {
            await removeEvent(selectedEvent.recurringId);
            router.back();
        }
    };

    useFocusEffect(
        useCallback(() => {
            return () => {
                reset();
                resetRecurring();
            };
        }, [])
    );

    const condition = selectedEvent && (selectedEvent?.recurringId && !disabled);

    const header = !selectedEvent
        ? "Add Event"
        : condition
            ? "Update Block"
            : "Update Event";

    const warnModalRef = useRef<AnimatedComponentRef>(null);

    return (
        <>
            <PageRouteButtons
                selected={!!selectedEvent}
                handleBack={() => router.back()}
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

            <PageHeader text={header} />
            <EventForm />
        </>
    );
};
