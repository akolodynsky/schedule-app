import React, {useEffect, useRef} from 'react';
import {router} from "expo-router";
import {BottomSheetMethods} from "@gorhom/bottom-sheet/lib/typescript/types";
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {useShallow} from "zustand/react/shallow";

import EventBottomCard from "./EventBottomCard";
import {useDateStore, useEventStore, useRecurringOptionsStore, useTaskStore} from "../stores";
import {loadEvents, removeEvent, updateEventState, updateRecurringState} from "@/src/presentation/services/eventActions";
//import {updateRecurring} from "@/src/storage/recurring-events";


const EventBottomSheet = () => {
    const bottomSheetRef = useRef<BottomSheetMethods>(null);

    const { selectedEvent, setSelectedEvent } = useEventStore(
        useShallow((state) => ({
            selectedEvent: state.selectedEvent,
            setSelectedEvent: state.setSelectedEvent,
        }))
    );

    const { setSelectedTask, setName, setIsCompleted } = useTaskStore(
        useShallow((state) => ({
            setSelectedTask: state.setSelectedTask,
            setName: state.setName,
            setIsCompleted: state.setIsCompleted,
        }))
    );

    const { selectedDate, setDate } = useDateStore(
        useShallow((state) => ({
            selectedDate: state.selectedDate,
            setDate: state.setDate,
        }))
    );

    const setDisabled = useRecurringOptionsStore(
        useShallow(state => state.setDisabled)
    );

    useEffect(() => {
        if (selectedEvent) {
            bottomSheetRef.current?.snapToIndex(0)
        } else {
            bottomSheetRef.current?.close();
        }
    }, [selectedEvent]);

    const handleRemoveEvent = async (id: string) => {
        await removeEvent(id, selectedEvent?.recurringId!);
        void loadEvents(selectedDate);
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

    const handleCheckTask = async (task: ITask, eventId: string) => {
        //await createTask(task.name, !task.isCompleted, task.date, task.id, eventId);
    }

    const handleUpdateTask = (task: ITask, event: IEvent) => {
        event && setSelectedEvent(event);
        setSelectedTask(task);
        setName(task.name);
        setIsCompleted(task.isCompleted);
        setDate(task.date);
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