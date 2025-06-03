import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';

import CategoryCard from "./CategoryCard";

import { icons } from "@/src/shared/constants";
import { getDuration } from "@/src/shared/utils";


const EventShortCard = ({event, remove}: {event: IEvent, remove?: () => void}) => {
    return (
        <View className={`w-full gap-2 rounded-[18px] border-2 px-3 ${remove ? "pt-2 pb-4 border-dark-200" : "p-3 pt-2 border-light-300"}`}>
            <View className="flex-row items-center justify-between">
                <View className="flex-row gap-1">
                    <Text className="font-inter_medium text-light-300 text-[12px]">{event.start} - {event.end}</Text>

                    <Text className="font-inter_medium text-light-300 text-[11px]">({getDuration(event.start, event.end)})</Text>
                </View>

                <View className="gap-4 flex-row items-center">
                    {event.tasksCount > 0 &&
                        <Text className="font-inter_medium text-light-300 text-sm">
                            {event.tasksCount} Task{event.tasksCount > 1 && 's'}
                        </Text>
                    }

                    {remove && (
                        <TouchableOpacity onPress={remove}>
                            <Image source={icons.del} className="size-7" tintColor={"#6b6f85"} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            <View className="flex-row flex-wrap items-center justify-between gap-2">
                <View className="ml-[-1px]">
                    <CategoryCard category={event.category} />
                </View>

                {event.name && <Text className="font-inter_bold text-light-100 text-lg" numberOfLines={1}>{event.name}</Text>}
            </View>
        </View>
    );
};

export default EventShortCard;
