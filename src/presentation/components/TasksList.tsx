import React, { useEffect, useRef } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { router } from "expo-router";
import { useShallow } from "zustand/react/shallow";
import { moderateScale } from "react-native-size-matters";

import TaskBlockCard from "./TaskBlockCard";

import { useTaskStore } from "../stores";
import { loadTasks, updateTask, updateTaskState } from "../services/task";
import { getEventById } from "../services/event";
import { colors, fonts } from "@/src/shared/constants";


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
        <View style={styles.container}>
            {tasks.length > 0
              ? <FlatList
                    ref={flatListRef}
                    data={tasks}
                    keyExtractor={(item: ITaskBlock) => item.date}
                    contentContainerStyle={styles.contentContainer}
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
              : <Text style={styles.text}>No tasks available...</Text>
            }
        </View>
    );
};

export default TasksList;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.dark_200,
        paddingHorizontal: moderateScale(22)
    },
    contentContainer: {
        paddingTop: moderateScale(148)
    },
    text: {
        color: colors.light_300,
        fontFamily: fonts.inter_medium,
        fontSize: moderateScale(13),
        alignSelf: 'center',
        marginTop: moderateScale(154)
    }
});