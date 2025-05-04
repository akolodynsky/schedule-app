import React, {useEffect, useRef} from 'react';
import {View, FlatList} from 'react-native';
import {router} from "expo-router";
import {useShallow} from "zustand/react/shallow";

import TaskBlockCard from "@/src/presentation/components/TaskBlockCard";
import {useDateStore, useEventStore, useTaskStore} from "../stores";
import {createTask} from "../../storage/tasks";
import {mergeTaskBlocks} from "../../shared/utils";


const TasksList = () => {
    const { mergedTasksBlocks, setMergedTasksBlocks, shouldReloadTasks, setShouldReloadTasks, setSelectedTask, setName, setIsCompleted } = useTaskStore(
        useShallow((state) => ({
            setSelectedTask: state.setSelectedTask,
            setName: state.setName,
            setIsCompleted: state.setIsCompleted,
            shouldReloadTasks: state.shouldReloadTasks,
            setShouldReloadTasks: state.setShouldReloadTasks,
            mergedTasksBlocks: state.mergedTasksBlocks,
            setMergedTasksBlocks: state.setMergedTasksBlocks,
        }))
    );

    const setDate = useDateStore(useShallow(state => state.setDate));
    const setSelectedEvent = useEventStore(useShallow(state => state.setSelectedEvent));

    const handleUpdate = (task: ITask, event?: IEvent) => {
        event && setSelectedEvent(event);
        setSelectedTask(task);
        setName(task.name);
        setIsCompleted(task.isCompleted);
        setDate(task.date);
        router.push("/task");
    }

    const handleCheck = async (task: ITask, eventId?: string) => {
        await createTask(task.name, !task.isCompleted, task.date, task.id, eventId);
    }

    useEffect(() => {
        if (!shouldReloadTasks) return;

        const loadMergedTaskBlocks = async () => {
            setMergedTasksBlocks(await mergeTaskBlocks());
            setShouldReloadTasks(false);
        };

        void loadMergedTaskBlocks();
    }, [shouldReloadTasks]);

    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        if (flatListRef.current && mergedTasksBlocks.length > 0) {
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
                    data={mergedTasksBlocks}
                    keyExtractor={(item: MergedTasksBlock) => item.date}
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
