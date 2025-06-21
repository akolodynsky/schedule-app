import React, { useEffect, useRef } from 'react';
import { StyleSheet } from "react-native";
import { router } from "expo-router";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useShallow } from "zustand/react/shallow";
import { moderateScale } from "react-native-size-matters";

import EventBottomCard from "./EventBottomCard";

import { useDateStore, useEventStore, useRecurringOptionsStore } from "../stores";
import { removeEvent, updateEventState, updateRecurringState } from "../services/event";
import { updateTask, updateTasksState, updateTaskState } from "../services/task";
import { colors } from "@/src/shared/constants";


const EventBottomSheet = () => {
    const bottomSheetRef = useRef<BottomSheetMethods>(null);

    const { selectedEvent, setSelectedEvent, setTasks } = useEventStore(
        useShallow((s) => ({
            selectedEvent: s.selectedEvent,
            setSelectedEvent: s.setSelectedEvent,
            setTasks: s.setTasks
        }))
    );

    const selectedDate = useDateStore(s => s.selectedDate);
    const setDisabled = useRecurringOptionsStore(s => s.setDisabled);


    useEffect(() => {
        if (selectedEvent) {
            if (selectedEvent.tasksCount > 0) {
                void updateTasksState(selectedEvent.id, selectedDate).then(() => {
                    setTimeout(() => {
                        bottomSheetRef.current?.snapToIndex(0)
                    }, 0)
                });
            } else {
                bottomSheetRef.current?.snapToIndex(0)
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
            backgroundStyle={styles.backgroundStyle}
            handleIndicatorStyle={styles.handleIndicatorStyle}
            onChange={(index) => handleChange(index)}
        >
            <BottomSheetView style={styles.container}>
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



const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: moderateScale(22),
        gap: moderateScale(10),
        paddingBottom: moderateScale(62)
    },
    backgroundStyle: {
        backgroundColor: colors.dark_100,
        borderRadius: moderateScale(30)
    },
    handleIndicatorStyle: {
        backgroundColor: colors.light_100
    }
});