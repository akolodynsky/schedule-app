import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { moderateScale } from "react-native-size-matters";

import TaskCard from "./TaskCard";
import CategoryCard, { DefaultCard } from "./CategoryCard";

import { formatDate } from "@/src/shared/utils";
import { colors, fonts } from "@/src/shared/constants";


interface TaskBlockCardProps {
    taskBlock: ITaskBlock;
    taskCheck: (task: ITask) => Promise<void>;
    taskUpdate: (task: ITask, id?: string) => void;
}

const TaskBlockCard = ({ taskBlock, taskCheck, taskUpdate }: TaskBlockCardProps) => {
    const currentDate = new Date().toLocaleDateString("sv-SE");
    const date = taskBlock.date === currentDate ? "Today" : formatDate(taskBlock.date)

    return (
        taskBlock.mainTasks.length > 0 || taskBlock.eventTasks.length > 0) && (
            <View key={taskBlock.date} style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{date}</Text>
                </View>

                <View style={styles.contentContainer}>
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
                                tasks={event.tasks}
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
        <View style={styles.headerContainer}>{header}</View>
        <View style={styles.tasksContainer}>
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



const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.dark_100,
        borderRadius: moderateScale(20),
        padding: moderateScale(17),
        marginBottom: moderateScale(22)
    },
    titleContainer: { marginBottom: moderateScale(-8) },
    contentContainer: { gap: moderateScale(14) },
    title: {
        fontFamily: fonts.inter_semibold,
        fontSize: moderateScale(15),
        color: colors.light_300
    },
    headerContainer: {
        maxWidth: '75%',
        zIndex: 10,
        alignSelf: 'flex-end',
        marginRight: moderateScale(22),
        marginBottom: moderateScale(-11)
    },
    tasksContainer: {
        backgroundColor: colors.dark_200,
        gap: moderateScale(10),
        paddingHorizontal: moderateScale(14),
        paddingVertical: moderateScale(16),
        borderRadius: moderateScale(20)
    }
});