import React from 'react';
import { Text, View } from 'react-native';

import TaskCard from "./TaskCard";
import CategoryCard from "./CategoryCard";

import { formatDate } from "@/src/shared/utils";


interface TaskBlockCardProps {
    taskBlock: ITaskBlock;
    taskCheck: (task: ITask) => Promise<void>;
    taskUpdate: (task: ITask, id?: string) => void;
}

const TaskBlockCard = ({taskBlock, taskCheck, taskUpdate}: TaskBlockCardProps) => {
    const currentDate = new Date().toISOString().split("T")[0];
    const date = taskBlock.date === currentDate ? "Today" : formatDate(taskBlock.date)

    return (
        taskBlock.mainTasks.length > 0 ||  taskBlock.eventTasks.length > 0) && (
            <View key={taskBlock.date} className="bg-dark-100 rounded-3xl px-5 py-5 mb-6">
                <View className="mb-[-8px]">
                    <Text className="font-inter_semibold text-light-300 text-lg">{date}</Text>
                </View>

                <View className="gap-4">
                    {taskBlock.mainTasks.length > 0 && (
                        <View>
                            <View className="self-end rounded-xl px-3 py-1 items-center bg-primary mr-6 mb-[-11px] z-10">
                                <Text className="font-inter_semibold text-light-100 text-[16px]">Main Tasks</Text>
                            </View>

                            <View className="bg-dark-200 gap-3 py-5 px-4 rounded-3xl">
                                {taskBlock.mainTasks.map((task) => (
                                    <TaskCard
                                        key={task.id}
                                        task={task}
                                        check={() => taskCheck(task)}
                                        longPress={() => taskUpdate(task)}
                                    />
                                ))}
                            </View>
                        </View>
                    )}

                    {taskBlock.eventTasks.map((event) => (
                        event.tasks.length > 0 && (
                            <View key={event.id}>
                                <View className="max-w-[75%] z-10 self-end mr-6 gap-3 flex-row mb-[-11px] items-center">
                                    <CategoryCard category={event.category} />
                                </View>

                                {event.tasks.length > 0 && (
                                    <View className="bg-dark-200 gap-3 py-5 px-4 rounded-3xl">
                                        {event.tasks.map((task: ITask) => (
                                            <TaskCard
                                                key={task.id}
                                                task={task}
                                                check={() => taskCheck(task)}
                                                longPress={() => taskUpdate(task, event.id)}
                                            />
                                        ))}
                                    </View>
                                )}
                            </View>
                        )))}
                </View>
            </View>
    )
};

export default TaskBlockCard;
