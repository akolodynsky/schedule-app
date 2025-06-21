import React, { useRef, memo, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TimePickerModal } from "react-native-paper-dates";
import { DefaultTheme, PaperProvider } from 'react-native-paper';
import { useShallow } from "zustand/react/shallow";
import { moderateScale } from "react-native-size-matters";

import { AnimatedComponent, AnimatedComponentRef } from "./ui";

import { useEventStore } from "../stores";
import { colors, fonts } from "@/src/shared/constants";


const TimePickerInput = ({ text }: { text: string }) => {
    const { start, setStart, end, setEnd } = useEventStore(
        useShallow((s) => ({
            start: s.start,
            end: s.end,
            setStart: s.setStart,
            setEnd: s.setEnd
        }))
    );


    const time = text === "Start" ? start : end;
    const setTime = text === "Start" ? setStart : setEnd;

    const modalRef = useRef<AnimatedComponentRef>(null);

    const onConfirm = ({ hours, minutes }: { hours: number, minutes: number}) => {
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        setTime(formattedTime);
        modalRef.current?.close();
    };

    useEffect(() => {
        if (start > end) {
            setEnd(start);
        }
    }, [start, end]);


    const theme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            primary: colors.primary,
            accent: colors.primary,
            surface: colors.dark_200,
            backdrop: 'rgba(0,0,0, .5)',
            onSurfaceVariant: colors.light_300
        },
    };

    return (
        <View style={{ flex: 1 }}>
            <Text style={styles.title}>{text}</Text>
            <Text onPress={() => modalRef.current?.open()} style={styles.textInput}>{time}</Text>
            <AnimatedComponent ref={modalRef} contentStyle={{ flex: 1 }}>
                <PaperProvider theme={theme}>
                    <TimePickerModal
                        visible
                        onDismiss={() => modalRef.current?.close()}
                        onConfirm={onConfirm}
                        hours={Number(time.split(":")[0])}
                        minutes={Number(time.split(":")[1])}
                        confirmLabel="OK"
                        animationType="none"
                    />
                </PaperProvider>
            </AnimatedComponent>
        </View>
    );
};

export default memo(TimePickerInput);



const styles = StyleSheet.create({
    title: {
        color: colors.light_200,
        fontFamily: fonts.inter_medium,
        marginBottom: moderateScale(10),
        alignSelf: 'center'
    },
    textInput: {
        backgroundColor: colors.dark_100,
        borderRadius: moderateScale(6),
        textAlign: 'center',
        paddingVertical: moderateScale(20),
        color: colors.light_100,
        fontFamily: fonts.inter_regular,
        fontSize: moderateScale(15)
    }
});
