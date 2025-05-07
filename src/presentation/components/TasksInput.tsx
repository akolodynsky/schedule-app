import React, {memo, useState} from 'react';
import {Image, Keyboard, Text, TouchableOpacity, View} from 'react-native';
import {useShallow} from "zustand/react/shallow";

import CustomTextInput from "@/src/presentation/components/ui/CustomTextInput";
import {useDateStore, useEventStore} from "../stores";
import {icons} from "@/src/shared/constants/icons";
import {generateUniqueId} from "../../shared/utils";


const TasksInput = () => {
    const { tasks, setTasks } = useEventStore(
        useShallow((state) => ({
            tasks: state.tasks,
            setTasks: state.setTasks
        }))
    );

    const date = useDateStore(useShallow(state => state.date));

    const [task, setTask] = useState("");

    const addTask = () => {
        if (task.trim()) {
            const newTask: ITask = {
                id: generateUniqueId("t"),
                name: task,
                date: date,
                isCompleted: false,
            };
            setTasks([...tasks, newTask]);
            setTask("");
            Keyboard.dismiss()
        }
    }

    const deleteTask = (id: string) => {
        const filteredTasks = tasks.filter((task) => task.id !== id);
        setTasks(filteredTasks);
    }

    return (
        <View className="mb-6">
            <Text className="text-light-200 font-inter_medium mb-3">Tasks</Text>

            <View className="bg-dark-100 rounded-lg px-4 pt-3 pb-1">
                <View className="flex-row justify-between items-center mb-2">
                    <CustomTextInput title={"task"} value={task} setValue={setTask} />

                    <TouchableOpacity onPress={addTask}>
                        <Image source={icons.add} className="size-8" />
                    </TouchableOpacity>
                </View>

                {tasks.length > 0 && (
                    <View className="gap-2 mb-3">
                        {tasks.map((task) => (
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
                                    <TouchableOpacity onPress={() => deleteTask(task.id)}>
                                        <Image source={icons.del} className="size-7" tintColor="#ef4444" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </View>
                )}
            </View>
        </View>

    );
};

export default memo(TasksInput);
