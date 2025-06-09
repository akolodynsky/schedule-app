import React, { useEffect, useRef } from 'react';
import { View, FlatList, Text } from 'react-native';
import {router} from "expo-router";
import { useShallow } from "zustand/react/shallow";

import TaskBlockCard from "./TaskBlockCard";

import { useTaskStore } from "../stores";
import { loadTasks, updateTask, updateTaskState } from "../services/task";
import { getEventById } from "../services/event";


const TasksList = () => {
    const { tasks, shouldTasksReload, setShouldTasksReload } = useTaskStore(
        useShallow(s => ({
            tasks: s.tasks,
            shouldTasksReload: s.shouldReloadTasks,
            setShouldTasksReload: s.setShouldReloadTasks
        }))
    );

    const handleCheck = async (task: ITask) => {
        updateTaskState(task);
        await updateTask(task.id, task.eventId);
    }

    const handleUpdate = (task: ITask, eventId?: string) => {
        updateTaskState(task);
        eventId && getEventById(eventId);
        router.push("/task");
    }

    useEffect(() => {
        if (shouldTasksReload) {
            const getTasks = async () => {
                await loadTasks();
                setShouldTasksReload(false);
            };
            void getTasks();
        }
    }, [shouldTasksReload]);

    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        if (flatListRef.current && tasks.length > 0) {
            setTimeout(() => {
                flatListRef.current?.scrollToEnd({ animated: false });
            }, 100);
        }
    }, []);

    return (
        <View className="flex-1 bg-dark-200 px-4">
            {tasks.length > 0
              ? <FlatList
                    ref={flatListRef}
                    data={tasks}
                    keyExtractor={(item: ITaskBlock) => item.date}
                    contentContainerStyle={{paddingTop: 160}}
                    className="bg-dark-200 px-4 flex-1"
                    showsVerticalScrollIndicator={false}
                    overScrollMode="never"
                    initialNumToRender={5}
                    maxToRenderPerBatch={5}
                    windowSize={5}
                    renderItem={({ item }) => (
                        <TaskBlockCard
                            taskBlock={item}
                            taskCheck={handleCheck}
                            taskUpdate={handleUpdate}
                        />
                    )}
                />
              : <Text className="font-inter_medium text-light-300 self-center text-sm mt-44">
                    No tasks available...
                </Text>
            }
        </View>
    );
};

export default TasksList;
