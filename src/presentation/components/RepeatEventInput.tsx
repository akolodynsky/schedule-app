import React, {useEffect, useRef} from 'react';
import {Text, View} from 'react-native';
import {useShallow} from "zustand/react/shallow";

import {IntervalSection, LimitDateSection} from "@/src/presentation/components/RepeatSections";
import {DayButton, FrequencyButton} from "@/src/presentation/components/RepeatButtons";
import {useDateStore, useRecurringOptionsStore} from "../stores";


const options = ['once', 'daily', 'weekly', 'monthly'];
const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];


const RepeatEventInput = () => {
    const { date } = useDateStore(
        useShallow(state => ({
            date: state.date,
        }))
    );

    const { frequency, endRepeat, setEndRepeat, daysOfWeek, setDaysOfWeek, disabled } = useRecurringOptionsStore(
        useShallow((state) => ({
            frequency: state.frequency,
            endRepeat: state.endRepeat,
            setEndRepeat: state.setEndRepeat,
            daysOfWeek: state.weekDays,
            setDaysOfWeek: state.setWeekDays,
            disabled: state.disabled
        }))
    );

    const firstDayIndex = new Date(date).getDay();
    const adjustedIndex = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

    useEffect(() => {
        if (daysOfWeek.length === 0 && frequency === "weekly") {
            setDaysOfWeek([adjustedIndex])
        }
    }, [date]);

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





