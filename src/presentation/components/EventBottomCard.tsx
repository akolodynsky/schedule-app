import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useShallow } from "zustand/react/shallow";
import { moderateScale, scale } from "react-native-size-matters";

import CategoryCard from "./CategoryCard";
import TaskCard from "./TaskCard";

import { useEventStore } from "../stores";
import { colors, fonts, icons } from "@/src/shared/constants";
import { getDuration } from "@/src/shared/utils";


interface EventBottomCardProps {
    update: () => void;
    remove: (id: string, recurringId: string, recurring: boolean) => Promise<void>;
    checkTask: (task: ITask, eventId: string) => Promise<void>;
    updateTask: (task: ITask, event: IEvent) => void;
    updateRecurring?: () => void;
}

const EventBottomCard = ({ update, remove, checkTask, updateTask, updateRecurring }: EventBottomCardProps) => {
    const { selectedEvent, tasks } = useEventStore(
        useShallow((state) => ({
            selectedEvent: state.selectedEvent,
            tasks: state.tasks
        }))
    );

    if (!selectedEvent) return null;

    const { id, category, description, name, start, end, recurringId, isRecurring } = selectedEvent;

    return (
        <>
            <View style={styles.headerContainer}>
                <View style={styles.timeContainer}>
                    <Text style={[styles.timeText, { fontSize: moderateScale(14) }]}>{start} - {end}</Text>

                    <Text style={[styles.timeText, { fontSize: moderateScale(13) }]}>({getDuration(start, end)})</Text>
                </View>

                <View style={styles.buttonsContainer}>
                    {updateRecurring && (
                        <TouchableOpacity onPress={updateRecurring}>
                            <Image source={icons.edit} style={styles.buttonImage} />
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity onPress={update}>
                        <Image source={icons.pencil} style={styles.buttonImage} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => remove(id, recurringId!, isRecurring)}>
                        <Image source={icons.trash} style={styles.buttonImage} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.contentContainer}>
                <View style={[styles.infoContainer, (!name && !description) && { alignSelf: 'flex-start' }]}>
                    <View style={styles.titleContainer}>
                        {name && <Text style={styles.nameText}>{name}</Text>}

                        <CategoryCard category={category} />
                    </View>
                    {description && <Text style={styles.descText}>{description}</Text>}
                </View>

                {tasks && tasks.length > 0 &&
                    <View style={styles.tasksContainer}>
                        {tasks.map((task) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                check={() => checkTask(task, id)}
                                longPress={() => updateTask(task, selectedEvent)}
                            />
                        ))}
                    </View>}
            </View>
        </>
    );
};

export default EventBottomCard;



const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: moderateScale(16)
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(6)
    },
    buttonsContainer: { flexDirection: 'row', gap: moderateScale(14) },
    timeText: { color: colors.light_300, fontFamily: fonts.inter_medium },
    buttonImage: { width: scale(22), height: scale(22) },
    contentContainer: { flex: 1, gap: moderateScale(10) },
    infoContainer: {
        backgroundColor: colors.dark_200,
        paddingHorizontal: moderateScale(14),
        paddingVertical: moderateScale(16),
        gap: moderateScale(10),
        borderRadius: moderateScale(26),
        width: '100%'
    },
    titleContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap-reverse',
        gap: moderateScale(10),
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    nameText: {
        color: colors.light_100,
        fontFamily: fonts.inter_bold,
        fontSize: moderateScale(18)
    },
    descText: {
        color: colors.light_200,
        fontFamily: fonts.inter_medium,
        fontSize: moderateScale(15),
        lineHeight: moderateScale(22)
    },
    tasksContainer: {
        backgroundColor: colors.dark_200,
        paddingHorizontal: moderateScale(14),
        paddingVertical: moderateScale(14),
        gap: moderateScale(6),
        borderRadius: moderateScale(26)
    }
});