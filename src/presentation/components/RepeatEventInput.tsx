import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useShallow } from "zustand/react/shallow";

import { IntervalSection, LimitDateSection } from "./RepeatSections";
import { DayButton, FrequencyButton } from "./RepeatButtons";

import { useDateStore, useRecurringOptionsStore } from "../stores";
import { getDayIndex} from "@/src/shared/utils";


type Frequency = 'once' | 'daily' | 'weekly' | 'monthly';
const options: Frequency[] = ['once', 'daily', 'weekly', 'monthly'];
const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];


const RepeatEventInput = () => {
    const { date } = useDateStore(
        useShallow(state => ({
            date: state.date,
        }))
    );

    const { frequency, endRepeat, setEndRepeat, weekDays, setWeekDays, disabled } = useRecurringOptionsStore(
        useShallow((state) => ({
            frequency: state.frequency,
            endRepeat: state.endRepeat,
            setEndRepeat: state.setEndRepeat,
            weekDays: state.weekDays,
            setWeekDays: state.setWeekDays,
            disabled: state.disabled
        }))
    );

    useEffect(() => {
        if (weekDays.length === 0 && frequency === "weekly") {
            setWeekDays([getDayIndex(date)])
        }
    }, [frequency, date]);

    useEffect(() => {
        if (endRepeat && new Date(date) >= new Date(endRepeat)) setEndRepeat("");
    }, [endRepeat]);

    return (
        !disabled &&
            <View className="mb-6">
                <Text className="text-light-200 font-inter_medium mb-3">Repeat</Text>

                <View className="bg-dark-100 rounded-lg py-4 px-3 gap-5">
                    <View className="flex-row gap-2 justify-between">
                        {options.map(option => (
                            <FrequencyButton key={option} option={option}/>
                        ))}
                    </View>

                    {frequency === "weekly" && (
                        <View className="flex-row justify-center gap-2">
                            {days.map((day, index) => (
                                <DayButton key={day} day={day} index={index}/>
                            ))}
                        </View>
                    )}

                    {frequency !== "once" && (
                        <View className="flex-row justify-between gap-3">
                            <LimitDateSection/>
                            <IntervalSection/>
                        </View>
                    )}
                </View>
            </View>
    );
};

export default RepeatEventInput;





