import React, { memo, useState } from 'react';
import { Image, Keyboard, Text, TouchableOpacity, View } from 'react-native';

import { CustomTextInput } from "./ui";

import { useDateStore, useEventStore, useRecurringOptionsStore } from "../stores";
import { removeTask } from "../services/task";
import { icons } from "@/src/shared/constants";
import { generateUniqueId } from "@/src/shared/utils";
import {useShallow} from "zustand/react/shallow";


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
        <View className="mb-6">
            <Text className="text-light-200 font-inter_medium mb-3">Tasks</Text>

            <View className="bg-dark-100 rounded-lg px-4 pt-3 pb-1">
                <View className="flex-row justify-between items-center mb-2">
                    <CustomTextInput title={"task"} value={task} setValue={setTask} length={450} />

                    <TouchableOpacity onPress={addTask}>
                        <Image source={icons.add} className="size-8" />
                    </TouchableOpacity>
                </View>

                {tasks.length > 0 && (
                    <View className="gap-2 mb-3">
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
        <View className="flex-row items-center justify-between" key={task.id}>
            <View className="mr-1 h-full">
                <Text className="font-inter_bold text-xl text-light-100">-</Text>
            </View>

            <View className="w-[87%]">
                <Text className="font-inter_regular text-[16px] text-light-100">
                    {task.name}
                </Text>
            </View>

            <View className="flex-1 items-end pr-[1px]">
                <TouchableOpacity onPress={() => onDelete(task.id)}>
                    <Image source={icons.del} className="size-7" tintColor="#ef4444" />
                </TouchableOpacity>
            </View>
        </View>
    );
};
