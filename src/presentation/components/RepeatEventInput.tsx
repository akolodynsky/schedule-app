import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useShallow } from "zustand/react/shallow";
import { moderateScale } from "react-native-size-matters";

import { IntervalSection, LimitDateSection } from "./RepeatSections";
import { DayButton, FrequencyButton } from "./RepeatButtons";

import { useDateStore, useRecurringOptionsStore } from "../stores";
import { getDayIndex} from "@/src/shared/utils";
import { colors, fonts } from "@/src/shared/constants";


export type Frequency = 'once' | 'daily' | 'weekly' | 'monthly';
const options: Frequency[] = ['once', 'daily', 'weekly', 'monthly'];
const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];


const RepeatEventInput = () => {
    const date = useDateStore(s => s.date);

    const { frequency, endRepeat, setEndRepeat, weekDays, setWeekDays, disabled } = useRecurringOptionsStore(
        useShallow((s) => ({
            frequency: s.frequency,
            endRepeat: s.endRepeat,
            setEndRepeat: s.setEndRepeat,
            weekDays: s.weekDays,
            setWeekDays: s.setWeekDays,
            disabled: s.disabled
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
            <View>
                <Text style={styles.title}>Repeat</Text>

                <View style={styles.contentContainer}>
                    <View style={styles.buttonsContainer}>
                        {options.map(option => (
                            <FrequencyButton key={option} option={option}/>
                        ))}
                    </View>

                    {frequency === "weekly" && (
                        <View style={styles.daysContainer}>
                            {days.map((day, index) => (
                                <DayButton key={day} day={day} index={index}/>
                            ))}
                        </View>
                    )}

                    {frequency !== "once" && (
                        <View style={styles.bottomContainer}>
                            <LimitDateSection />
                            <IntervalSection />
                        </View>
                    )}
                </View>
            </View>
    );
};

export default RepeatEventInput;



const styles = StyleSheet.create({
    title: {
        fontFamily: fonts.inter_medium,
        color: colors.light_200,
        marginBottom: moderateScale(10)
    },
    contentContainer: {
        backgroundColor: colors.dark_100,
        borderRadius: moderateScale(6),
        paddingHorizontal: moderateScale(12),
        paddingVertical: moderateScale(14),
        gap: moderateScale(18)
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: moderateScale(6)
    },
    daysContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: moderateScale(5)
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: moderateScale(10)
    }
});


