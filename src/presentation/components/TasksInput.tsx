import React, { memo, useState } from 'react';
import { Image, Keyboard, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useShallow } from "zustand/react/shallow";
import { moderateScale, scale } from "react-native-size-matters";

import { CustomTextInput } from "./ui";

import { useDateStore, useEventStore, useRecurringOptionsStore } from "../stores";
import { removeTask } from "../services/task";
import { colors, fonts, icons } from "@/src/shared/constants";
import { generateUniqueId } from "@/src/shared/utils";


const TasksInput = () => {
    const { tasks, setTasks, selectedEvent } = useEventStore(
        useShallow(s => ({
            tasks: s.tasks,
            setTasks: s.setTasks,
            selectedEvent: s.selectedEvent,
        }))
    );

    const date = useDateStore(s => s.date);
    const disabled = useRecurringOptionsStore(s => s.disabled);

    const [task, setTask] = useState("");


    const addTask = () => {
        if (task.trim()) {
            const newTask: ITask = {
                id: generateUniqueId("t"),
                name: task,
                date,
                isCompleted: false,
            };
            setTasks([...tasks, newTask]);
            setTask("");
            Keyboard.dismiss()
        }
    };

    const deleteTask = async (id: string) => {
        const filteredTasks = tasks.filter((task) => task.id !== id);
        setTasks(filteredTasks);
        await removeTask(id);
    };

    return (
        !(selectedEvent?.recurringId && !disabled) &&
        <View>
            <Text style={styles.title}>Tasks</Text>

            <View style={styles.inputContainer}>
                <View style={styles.fieldContainer}>
                    <CustomTextInput title={"task"} value={task} setValue={setTask} length={450} />

                    <TouchableOpacity onPress={addTask}>
                        <Image source={icons.add} style={styles.addImage} />
                    </TouchableOpacity>
                </View>

                {tasks.length > 0 && (
                    <View style={styles.tasksContainer}>
                        {tasks.map((task) => (
                            <TaskItem key={task.id} task={task} onDelete={deleteTask} />
                        ))}
                    </View>
                )}
            </View>
        </View>

    );
};

export default memo(TasksInput);


const TaskItem = ({ task, onDelete }: { task: ITask, onDelete: (id: string) => void}) => {
    return (
        <View style={styles.taskContainer} key={task.id}>
            <View style={styles.arrowContainer}>
                <Text style={styles.arrowText}>-</Text>
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.taskText}>
                    {task.name}
                </Text>
            </View>

            <View style={styles.removeContainer}>
                <TouchableOpacity onPress={() => onDelete(task.id)}>
                    <Image source={icons.del} style={styles.removeImage} />
                </TouchableOpacity>
            </View>
        </View>
    );
};



const styles = StyleSheet.create({
    title: {
        fontFamily: fonts.inter_medium,
        color: colors.light_200,
        marginBottom: moderateScale(10)
    },
    inputContainer: {
        backgroundColor: colors.dark_100,
        borderRadius: moderateScale(6),
        paddingHorizontal: moderateScale(12),
        paddingTop: moderateScale(11),
        paddingBottom: moderateScale(5)
    },
    fieldContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: moderateScale(6)
    },
    tasksContainer: {
        gap: moderateScale(4),
        marginBottom: moderateScale(8)
    },
    addImage: { width: scale(28), height: scale(28) },
    taskContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    arrowContainer: {
        marginRight: moderateScale(5),
        height: '100%',
    },
    arrowText: {
        fontFamily: fonts.inter_bold,
        color: colors.light_100,
        fontSize: moderateScale(16)
    },
    textContainer: {
        width: '86%',
    },
    taskText: {
        fontFamily: fonts.inter_regular,
        color: colors.light_100,
        fontSize: moderateScale(14)
    },
    removeContainer: {
        flex: 1,
        alignItems: 'center'
    },
    removeImage: {
        width: scale(22),
        height: scale(22),
        tintColor: '#ef4444'
    }
});