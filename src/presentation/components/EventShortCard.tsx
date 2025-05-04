import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';

import CategoryCard from "@/src/presentation/components/CategoryCard";
import {icons} from "@/src/shared/constants/icons";
import {getDuration} from "../../shared/utils";


const EventShortCard = ({event, remove}: {event: IEvent, remove?: () => void}) => {
    return (
        <View className={`w-full gap-3 rounded-[18px] border-2 px-3 ${remove ? "pt-2 pb-4 border-dark-200" : "p-4 border-light-300"}`}>
            <View className="flex-row items-center justify-between">
                <View className="flex-row gap-1">
                    <Text className="font-inter_medium text-light-300 text-[13px]">{event.start} - {event.end}</Text>

                    <Text className="font-inter_medium text-light-300 text-[12px]">({getDuration(event.start, event.end)})</Text>
                </View>

                <View className="gap-4 flex-row items-center">
                    {event.tasks && event.tasks.length > 0 &&
                        <Text className="font-inter_medium text-light-300 text-sm">
                            {event.tasks.length} Task{event.tasks.length > 1 && 's'}
                        </Text>
                    }

                    {remove && (
                        <TouchableOpacity onPress={remove}>
                            <Image source={icons.del} className="size-8" tintColor={"#6b6f85"} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            <View className="flex-row flex-wrap items-center justify-between gap-2">
                <View className="ml-[-1px]">
                    <CategoryCard category={event.category} />
                </View>

                {event.name && <Text className="font-inter_bold text-light-100 text-xl" numberOfLines={1}>{event.name}</Text>}
            </View>
        </View>
    );
};

export default EventShortCard;
