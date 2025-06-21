import React, { useCallback, useRef } from 'react';
import { router } from "expo-router";
import { useShallow } from "zustand/react/shallow";
import { useFocusEffect } from "@react-navigation/core";

import { PageRouteButtons, PageHeader } from "../components/ui";
import TaskForm from "../components/TaskForm";

import { useDateStore, useEventStore, useTaskStore } from "../stores";
import { createTask, removeTask, updateTask } from "../services/task";
import { loadEvents } from "../services/event";


export default function TaskCreate()  {
    const { reset, selectedTask, updateTaskBlock } = useTaskStore(
        useShallow((state) => ({
            reset: state.reset,
            selectedTask: state.selectedTask,
            updateTaskBlock: state.updateTaskBlock
        }))
    );

    const { selectedEvent, setSelectedEvent } = useEventStore(
        useShallow((state) => ({
            selectedEvent: state.selectedEvent,
            setSelectedEvent: state.setSelectedEvent
        }))
    );

    const date = useDateStore(useShallow(state => state.date));

    const prevDate = useRef(date);
    const prevEventId = useRef(selectedEvent?.id);


    const handleAddTask = async () => {
        if (!selectedTask) {
            await createTask(selectedEvent?.id);
        } else {
            if (date !== prevDate.current || selectedEvent?.id !== prevEventId.current) {
                await updateTaskBlock(selectedTask.id);
            }
            await updateTask(selectedTask.id, selectedEvent?.id, router.back);
        }
        await loadEvents(date);
    };

    const handleRemoveTask = async () => {
        if (selectedTask) {
            await removeTask(selectedTask.id);
            await loadEvents(date);
            router.back();
        }
    }

    useFocusEffect(
        useCallback(() => {
            return () => {
                setSelectedEvent(null);
                reset();
            };
        }, [])
    );

    return (
        <>
            <PageRouteButtons
                selected={!!selectedTask}
                handleBack={() => router.back()}
                handleAdd={handleAddTask}
                handleRemove={selectedTask && handleRemoveTask}
            />

            <PageHeader text={(selectedTask ? "Update" : "Add") + " Task"} />
            <TaskForm />
        </>
    );
};
