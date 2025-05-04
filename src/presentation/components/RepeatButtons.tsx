import React from "react";
import {Pressable, Text, View} from "react-native";
import Animated from "react-native-reanimated";
import {useRecurringOptionsStore} from "@/src/presentation/stores/useRecurringOptionsStore";
import {useShallow} from "zustand/react/shallow";

export const FrequencyButton = ({option}: {option: "once" | "daily" | "weekly" | "monthly"}) => {
    const { frequency, setFrequency} = useRecurringOptionsStore(
        useShallow((state) => ({
            frequency: state.frequency,
            setFrequency: state.setFrequency,
        }))
    );

    return (
        <Pressable
            className="flex-1"
            onPress={() => setFrequency(option)}
        >
            <Animated.View className={`rounded-2xl py-4 items-center ${frequency === option ? "bg-primary" : "bg-dark-200"}`}>
                <Text className={`font-inter_regular text-lg ${frequency === option ? "text-light-100" : "text-light-300"}`}>
                    {option.slice(0, 1).toUpperCase() + option.slice(1)}
                </Text>
            </Animated.View>
        </Pressable>
    )
};


export const DayButton = ({day, index}: {day: string, index: number}) => {
    const { weekDays, setWeekDays} = useRecurringOptionsStore(
        useShallow((state) => ({
            weekDays: state.weekDays,
            setWeekDays: state.setWeekDays,
        }))
    );

    return (
        <Pressable
            onPress={() => {
                const daysOfWeek = weekDays.includes(index)
                    ? weekDays.filter(d => d !== index)
                    : [...weekDays, index]
                setWeekDays(daysOfWeek)}
            }
        >
            <View
                className={`rounded-full w-11 h-11 items-center justify-center 
                ${weekDays.includes(index) ? "bg-light_bg" : "bg-dark-200"}`}
            >
                <Text
                    className={`font-inter_medium text-light-100 text-lg 
                    ${weekDays.includes(index) ? "text-light-100" : "text-light-300"}`}
                >
                    {day}
                </Text>
            </View>
        </Pressable>
    )
};