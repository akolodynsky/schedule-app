import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

import CategoryCard from "../components/CategoryCard";
import TaskCard from "@/src/presentation/components/TaskCard";
import {icons} from "../../shared/constants/icons";
import {useEventStore} from "../stores";
import {getDuration} from "../../shared/utils";


interface EventBottomCardProps {
    update: () => void;
    remove: (id: string, recurringId: string, recurring: boolean) => Promise<void>;
    checkTask: (task: ITask, eventId: string) => Promise<void>;
    updateTask: (task: ITask, event: IEvent) => void;
    updateRecurring?: () => void;
}

const EventBottomCard = ({ update, remove, checkTask, updateTask, updateRecurring }: EventBottomCardProps) => {
    const { selectedEvent, tasks } = useEventStore();

    if (!selectedEvent) return null;

    const {id, category, description, name, start, end, recurringId, isRecurring} = selectedEvent;

    return (
        <>
            <View className="flex-row justify-between items-center mb-6">
                <View className="flex-row items-center gap-2">
                    <Text className="font-inter_medium text-light-300 text-[15px]">{start} - {end}</Text>

                    <Text className="font-inter_medium text-light-300 text-[14px]">({getDuration(start, end)})</Text>
                </View>

                <View className="flex-row gap-4">
                    {updateRecurring && (
                        <TouchableOpacity onPress={updateRecurring}>
                            <Image source={icons.edit} className="size-7" />
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity onPress={update}>
                        <Image source={icons.pencil} className="size-7" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => remove(id, recurringId!, isRecurring)}>
                        <Image source={icons.trash} className="size-7" />
                    </TouchableOpacity>
                </View>
            </View>

            <View className="gap-3 flex-1 ">
                <View className={`bg-dark-200 w-full px-4 py-5 rounded-[28px] gap-3 ${(!name && !description) && "self-start"}`}>
                    <View className="flex-row flex-wrap-reverse gap-3 justify-between items-center">
                        {name && <Text className="font-inter_bold text-light-100 text-[21px]">{name}</Text>}

                        <CategoryCard category={category} />
                    </View>
                    {description &&
                        <Text className="font-inter_medium text-light-200 text-lg">{description}</Text>}
                </View>

                {tasks && tasks.length > 0 &&
                    <View className="bg-dark-200 px-4 py-4 rounded-[28px] gap-2">
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
