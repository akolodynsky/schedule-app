import React, { useEffect, useRef } from 'react';
import { router } from "expo-router";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useShallow } from "zustand/react/shallow";

import EventBottomCard from "./EventBottomCard";

import { useDateStore, useEventStore, useRecurringOptionsStore } from "../stores";
import { removeEvent, updateEventState, updateRecurringState } from "../services/event";
import { updateTask, updateTasksState, updateTaskState } from "../services/task";


const EventBottomSheet = () => {
    const bottomSheetRef = useRef<BottomSheetMethods>(null);

    const { selectedEvent, setSelectedEvent, setTasks } = useEventStore(
        useShallow((state) => ({
            selectedEvent: state.selectedEvent,
            setSelectedEvent: state.setSelectedEvent,
            setTasks: state.setTasks
        }))
    );

    const selectedDate = useDateStore(
        useShallow(state => state.selectedDate)
    );

    const setDisabled = useRecurringOptionsStore(
        useShallow(state => state.setDisabled)
    );

    useEffect(() => {
        if (selectedEvent) {
            bottomSheetRef.current?.snapToIndex(0)
            if (selectedEvent.tasksCount > 0) {
                void updateTasksState(selectedEvent.id, selectedDate);
            }
        } else {
            bottomSheetRef.current?.close();
            setTasks([]);
        }
    }, [selectedEvent]);

    const handleRemoveEvent = async (id: string, recurringId: string, recurring: boolean) => {
        if (recurringId && recurring) {
            await removeEvent(recurringId, selectedDate);
        } else {
            await removeEvent(id, selectedDate);
        }
        bottomSheetRef.current?.close();
    }

    const handleUpdateEvent = () => {
        if (selectedEvent) {
            router.push("/create");
            void updateEventState(selectedEvent);

            if (selectedEvent.recurringId) {
                setDisabled(true);
            }
        }
    }

    const handleUpdateRecurringEvent = () => {
        if (selectedEvent && selectedEvent.recurringId) {
            router.push("/create");
            void updateEventState(selectedEvent);
            void updateRecurringState(selectedEvent.recurringId);
        }
    }

    const handleCheckTask = async (task: ITask) => {
        updateTaskState(task);
        await updateTask(task.id, task.eventId);
    }

    const handleUpdateTask = (task: ITask) => {
        updateTaskState(task);
        router.push("/task");
    }

    const handleChange = (index: number) => {
        index === -1 && setSelectedEvent(null);
    }

    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            snapPoints={["50%", "65%", "80%"]}
            enablePanDownToClose
            backgroundStyle={{backgroundColor: '#1a1a24', borderRadius: 30}}
            handleIndicatorStyle={{backgroundColor: '#efeff9'}}
            onChange={(index) => handleChange(index)}
        >
            <BottomSheetView className="flex-1 px-6 gap-3 pb-16">
                <EventBottomCard
                    update={handleUpdateEvent}
                    remove={handleRemoveEvent}
                    checkTask={handleCheckTask}
                    updateTask={handleUpdateTask}
                    updateRecurring={selectedEvent?.recurringId ? handleUpdateRecurringEvent : undefined}
                />
            </BottomSheetView>
        </BottomSheet>
    );
};

export default EventBottomSheet;