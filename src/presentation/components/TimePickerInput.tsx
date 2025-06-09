import React, {useRef, memo, useEffect} from 'react';
import { Text, View } from 'react-native';
import { TimePickerModal } from "react-native-paper-dates";
import { DefaultTheme, PaperProvider } from 'react-native-paper';
import { useShallow } from "zustand/react/shallow";

import { AnimatedComponent, AnimatedComponentRef} from "./ui";

import { useEventStore } from "../stores";


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
            primary: '#6f4bf7',
            accent: '#6f4bf7',
            surface: '#242333',
            backdrop: 'rgba(0,0,0, .5)',
            onSurfaceVariant: '#6b6f85',
        },
    };

    return (
        <View>
            <Text className="text-light-200 font-inter_medium mb-3 self-center">{text}</Text>
            <Text onPress={() => modalRef.current?.open()}
                  className="bg-dark-100 rounded-lg px-4 py-6 font-inter_regular text-lg text-light-100">
                {time}
            </Text>
            <AnimatedComponent ref={modalRef} contentStyle="flex-1">
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
