import React, {useEffect, useRef} from 'react';
import {View} from "react-native";
import {router} from "expo-router";
import {useShallow} from "zustand/react/shallow";

import {useDateStore, useEventStore, useTaskStore} from "../stores";
import PageRouteButtons from "@/src/presentation/components/ui/PageRouteButtons";
import PageHeader from "@/src/presentation/components/ui/PageHeader";
import TaskForm from "../components/TaskForm";
import {createTask, removeTask} from "../../storage/tasks";


export default function TaskCreate()  {
    const { name, isCompleted, reset, selectedTask, setError } = useTaskStore(
        useShallow((state) => ({
            name: state.name,
            isCompleted: state.isCompleted,
            reset: state.reset,
            selectedTask: state.selectedTask,
            setError: state.setError,
        }))
    );

    const date = useDateStore(useShallow(state => state.date));

    const { selectedEvent, setSelectedEvent } = useEventStore(
        useShallow((state) => ({
            selectedEvent: state.selectedEvent,
            setSelectedEvent: state.setSelectedEvent,
        }))
    );

    const prevDateRef = useRef(date);
    const prevEventRef = useRef(selectedEvent);

    const cleanupAndBack = () => {
        setSelectedEvent(null);
        router.back();
        reset();
    }

    const handleAddTask = async () => {
        if (!name) {
            setError("Name is required!");
            return;
        }

        if ((prevDateRef.current !== date || prevEventRef.current !== selectedEvent) && selectedTask) {
            await removeTask(prevDateRef.current, selectedTask.id, prevEventRef.current?.id ?? '');
        }

        await createTask(name, isCompleted, date, selectedTask?.id, selectedEvent?.id ?? '');
        cleanupAndBack();
    };

    const handleRemoveTask = async () => {
        if (selectedTask) {
            await removeTask(selectedTask.date, selectedTask.id, selectedEvent?.id ?? '');
            cleanupAndBack();
        }
    }

    useEffect(() => {
        useEventStore.getState().setShouldReloadEvents(true);
    }, []);

    return (
        <>
            <PageRouteButtons
                selected={!!selectedTask}
                handleBack={cleanupAndBack}
                handleAdd={handleAddTask}
                handleRemove={handleRemoveTask}
            />

            <View className="flex-1 bg-dark-200">
                <PageHeader name={(selectedTask ? "Update" : "Add") + " Task"} />
                <TaskForm />
            </View>
        </>
    );
};
