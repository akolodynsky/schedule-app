import React from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, View} from "react-native";
import {router} from "expo-router";
import {useShallow} from "zustand/react/shallow";

import PageRouteButtons from "../components/ui/PageRouteButtons";
import PageHeader from "../components/ui/PageHeader";
import EventForm from "../components/EventForm";
import {useEventStore, useRecurringOptionsStore} from "../stores";
import {createEvent, removeEvent, updateEvent} from "../services/event";


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
        if (!selectedEvent) {
            await createEvent();
        } else {
            await updateEvent(selectedEvent);
        }
    };

    const handleRemoveRecurringEvents = async () => {
        if (selectedEvent?.recurringId && selectedEvent?.isRecurring) {
            await removeEvent(selectedEvent.recurringId);
            handleBack();
        }
    };

    const handleBack = () => {
        router.back();
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
                handleRemove={condition ? handleRemoveRecurringEvents : null}
            />

            <View className="flex-1 bg-dark-200">
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : "height"}
                >
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                        overScrollMode="never"
                    >
                        <PageHeader name={header} />
                        <EventForm />
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </>
    );
};
