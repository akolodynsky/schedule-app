import React from 'react';
import {Text, View} from 'react-native';

import CategoryCard from "@/src/presentation/components/CategoryCard";
import TaskCard from "@/src/presentation/components/TaskCard";
import {formatDate} from "../../shared/utils";


interface TaskBlockCardProps {
    taskBlock: MergedTasksBlock;
    taskCheck: (task: ITask, eventId?: string) => Promise<void>;
    taskUpdate: (task: ITask, event?: IEvent) => void;
}

const TaskBlockCard = ({taskBlock, taskCheck, taskUpdate}: TaskBlockCardProps) => {
    const currentDate = new Date().toISOString().split("T")[0];
    const date = taskBlock.date === currentDate ? "Today" : formatDate(taskBlock.date)

    return (
        taskBlock.tasks.length > 0 || taskBlock.events.length > 0) && (
            <View key={taskBlock.date} className="bg-dark-100 rounded-3xl px-5 py-5 mb-6">
                <View className="mb-[-8px]">
                    <Text className="font-inter_semibold text-light-300 text-lg">{date}</Text>
                </View>

                <View className="gap-4">
                    {taskBlock.tasks.length > 0 && (
                        <View>
                            <View className="self-end rounded-xl px-3 py-1 items-center bg-primary mr-6 mb-[-11px] z-10">
                                <Text className="font-inter_semibold text-light-100 text-[16px]">Main Tasks</Text>
                            </View>

                            <View className="bg-dark-200 gap-3 py-5 px-4 rounded-3xl">
                                {taskBlock.tasks.map((task) => (
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

                    {taskBlock.events.map((event) => (
                        event.tasks.length > 0 && (
                            <View key={event.id}>
                                <View className="max-w-[75%] z-10 self-end mr-6 gap-3 flex-row mb-[-11px] items-center">
                                    <CategoryCard category={event.category} />
                                </View>

                                {event.tasks.length > 0 && (
                                    <View className="bg-dark-200 gap-3 py-5 px-4 rounded-3xl">
                                        {event.tasks.map((task) => (
                                            <TaskCard
                                                key={task.id}
                                                task={task}
                                                check={() => taskCheck(task, event.id)}
                                                longPress={() => taskUpdate(task, event)}
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
