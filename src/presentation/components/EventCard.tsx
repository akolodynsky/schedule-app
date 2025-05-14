import React from 'react';
import {Text, View, Pressable} from 'react-native';
import Animated from "react-native-reanimated";

import CategoryCard from "@/src/presentation/components/CategoryCard";
import {getDuration, isCurrentTime} from "../../shared/utils";
import {useAnimatedScale} from "../../shared/hooks";


const EventCard = (props: (IEvent | IGap) & {first: number, handlePress: () => void}) => {
    const { start, end, first, handlePress } = props;

    const {animatedStyle, handlePressOut, handlePressIn} = useAnimatedScale();

    const duration = start && end && getDuration(start, end);
    const firstEvent = first === 0;
    const currentEvent = isCurrentTime(start, end);

    const isUserEvent = "category" in props;

    const onPress = () => {
        handlePressIn();
        handlePress();

        setTimeout(() => {
            handlePressOut();
        }, 50);
    };

    return (
        <Pressable
            className="mb-0.5"
            onPress={onPress}
        >
            {firstEvent &&
                <Text className="font-inter_medium text-light-300 text-sm">{start}</Text>
            }

            <Animated.View
                style={animatedStyle}
                className={`self-end border-2 rounded-[18px] w-[83%] px-3 py-4 
                ${currentEvent ? "border-light-100" : "border-light-200"}`}
            >
                {isUserEvent &&
                    <>
                        <View className="mb-3 flex-row items-center justify-between">
                            <View className="max-w-[70%]">
                                <CategoryCard category={props.category} />
                            </View>

                            {props.tasksCount > 0 &&
                                <View className="mb-2 bg-dark-100 self-start px-4 py-2 rounded-[36px] flex-row items-center">
                                    <Text className="font-inter_medium text-light-100 text-sm">
                                        {props.tasksCount} Task{props.tasksCount > 1 && 's'}
                                    </Text>
                                </View>
                            }
                        </View>

                        {props.name &&
                            <Text
                                className="font-inter_bold text-light-100 text-lg mb-2">
                                {props.name}
                            </Text>
                        }

                        {props.description &&
                            <Text
                                className="font-inter_regular text-light-100 text-sm mb-3"
                                numberOfLines={2}>
                                {props.description}
                            </Text>
                        }
                    </>
                }

                <Text className="font-inter_bold text-light-100 text-[13px]">{duration}</Text>
            </Animated.View>
            <Text className="font-inter_medium text-light-300 text-sm">{end}</Text>
        </Pressable>
    );
};

export default EventCard;
