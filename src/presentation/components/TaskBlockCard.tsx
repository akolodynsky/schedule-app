import React from 'react';
import { Text, View } from 'react-native';

import TaskCard from "./TaskCard";
import CategoryCard, { DefaultCard } from "./CategoryCard";

import { formatDate } from "@/src/shared/utils";


interface TaskBlockCardProps {
    taskBlock: ITaskBlock;
    taskCheck: (task: ITask) => Promise<void>;
    taskUpdate: (task: ITask, id?: string) => void;
}

const TaskBlockCard = ({ taskBlock, taskCheck, taskUpdate }: TaskBlockCardProps) => {
    const currentDate = new Date().toLocaleDateString("sv-SE");
    const date = taskBlock.date === currentDate ? "Today" : formatDate(taskBlock.date)

    return (
        taskBlock.mainTasks.length > 0 ||  taskBlock.eventTasks.length > 0) && (
            <View key={taskBlock.date} className="bg-dark-100 rounded-3xl px-5 py-5 mb-6">
                <View className="mb-[-8px]">
                    <Text className="font-inter_semibold text-light-300 text-lg">{date}</Text>
                </View>

                <View className="gap-4">
                    {taskBlock.mainTasks.length > 0 && (
                        <TaskGroup
                            tasks={taskBlock.mainTasks}
                            header={<DefaultCard />}
                            check={taskCheck}
                            update={taskUpdate}
                        />
                    )}

                    {taskBlock.eventTasks.map((event) => (
                        event.tasks.length > 0 && (
                            <TaskGroup
                                key={event.id}
                                tasks={taskBlock.mainTasks}
                                header={<CategoryCard category={event.category} />}
                                check={taskCheck}
                                update={taskUpdate}
                                eventId={event.id}
                            />
                        )))}
                </View>
            </View>
    )
};

export default TaskBlockCard;



interface TaskGroupProps {
    tasks: ITask[];
    header: React.ReactNode;
    check: (task: ITask) => Promise<void>;
    update: (task: ITask, id?: string) => void;
    eventId?: string;
}

const TaskGroup = ({ tasks, header, check, update, eventId }: TaskGroupProps) => (
    <View>
        <View className="max-w-[75%] z-10 self-end mr-6 mb-[-11px]">{header}</View>
        <View className="bg-dark-200 gap-3 py-5 px-4 rounded-3xl">
            {tasks.map((task) => (
                <TaskCard
                    key={task.id}
                    task={task}
                    check={() => check(task)}
                    longPress={() => update(task, eventId)}
                />
            ))}
        </View>
    </View>
);
