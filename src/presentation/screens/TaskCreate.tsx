import React, {useRef} from 'react';
import {View} from "react-native";
import {router} from "expo-router";
import {useShallow} from "zustand/react/shallow";

import {useDateStore, useEventStore, useTaskStore} from "../stores";
import PageRouteButtons from "@/src/presentation/components/ui/PageRouteButtons";
import PageHeader from "@/src/presentation/components/ui/PageHeader";
import TaskForm from "../components/TaskForm";
import {createTask, removeTask, updateTask} from "@/src/presentation/services/task";
import {loadEvents} from "@/src/presentation/services/event";



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
            await createTask(handleBack, selectedEvent?.id);
        } else {
            if (date !== prevDate.current || selectedEvent?.id !== prevEventId.current) {
                await updateTaskBlock(selectedTask.id);
            }
            await updateTask(selectedTask.id, selectedEvent?.id, handleBack);
        }
        await loadEvents(date);
    };

    const handleRemoveTask = async () => {
        if (selectedTask) {
            await removeTask(selectedTask.id);
            await loadEvents(date);
            handleBack();
        }
    }

    const handleBack = () => {
        setSelectedEvent(null);
        router.back();
        reset();
    }

    return (
        <>
            <PageRouteButtons
                selected={!!selectedTask}
                handleBack={handleBack}
                handleAdd={handleAddTask}
                handleRemove={selectedTask && handleRemoveTask}
            />

            <View className="flex-1 bg-dark-200">
                <PageHeader name={(selectedTask ? "Update" : "Add") + " Task"} />
                <TaskForm />
            </View>
        </>
    );
};
