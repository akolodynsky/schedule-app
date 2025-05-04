import React from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, View} from "react-native";
import {router} from "expo-router";
import {useShallow} from "zustand/react/shallow";

import PageRouteButtons from "@/src/presentation/components/ui/PageRouteButtons";
import PageHeader from "@/src/presentation/components/ui/PageHeader";
import EventForm from "../components/EventForm";
import {useEventStore, useRecurringOptionsStore} from "../stores";
import {createEvent, updateEvent} from "@/src/presentation/services/eventActions";


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

    const handleBack = () => {
        router.back();
        reset();
        resetRecurring();
    };

    const header = !selectedEvent
        ? "Add Event"
        : selectedEvent.recurringId && !disabled
            ? "Update All Events"
            : "Update Event";

    return (
        <>
            <PageRouteButtons
                selected={selectedEvent && true}
                handleBack={handleBack}
                handleAdd={handleAddEvent}
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
