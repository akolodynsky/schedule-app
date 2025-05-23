import React, {useEffect, useRef} from 'react';
import {View, FlatList} from 'react-native';
import {useShallow} from "zustand/react/shallow";

import TaskBlockCard from "@/src/presentation/components/TaskBlockCard";
import {useEventStore, useRecurringOptionsStore, useTaskStore} from "../stores";
import {loadTasks, updateTask, updateTaskState} from "@/src/presentation/services/task";
import {router} from "expo-router";
import {getEventById} from "@/src/presentation/services/event";


const TasksList = () => {
    const tasks = useTaskStore(state => state.tasks);

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
        const getTasks = async () => {
            await loadTasks();
        };
        void getTasks();
    }, []);

    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        if (flatListRef.current && tasks.length > 0) {
            setTimeout(() => {
                flatListRef.current?.scrollToEnd({ animated: false });
            }, 100);
        }
    }, []);

    return (
        <View className="bg-dark-100 flex-1">
            <View className="flex-1 bg-dark-200 rounded-tr-[76px]">
                <FlatList
                    ref={flatListRef}
                    data={tasks}
                    keyExtractor={(item: ITaskBlock) => item.date}
                    contentContainerStyle={{paddingHorizontal: 16, paddingTop: 26}}
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
            </View>
        </View>
    );
};

export default TasksList;
