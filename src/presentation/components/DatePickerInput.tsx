import React, {memo, useRef} from 'react';
import {Pressable, Text, View} from 'react-native';
import {useShallow} from "zustand/react/shallow";

import AnimatedComponent, {AnimatedComponentRef} from "@/src/presentation/components/ui/AnimatedComponent";
import DatePicker from "@/src/presentation/components/ui/DatePicker";
import {useDateStore} from "../stores";
import {formatDate} from "../../shared/utils";


const DatePickerInput = () => {
    const { date, setDate } = useDateStore(
        useShallow(state => ({
            date: state.date,
            setDate: state.setDate,
        }))
    );

    const modalRef = useRef<AnimatedComponentRef>(null);

    return (
        <View>
            <Text className="text-light-200 font-inter_medium mb-3">Date</Text>
            <Pressable onPress={() => modalRef.current?.open()}>
                <Text
                    className="bg-dark-100 rounded-lg px-4 py-6 font-inter_regular text-lg text-light-100">{formatDate(date)}</Text>
            </Pressable>
            <AnimatedComponent ref={modalRef} modalStyle="justify-center items-center">
                <DatePicker date={date} setDate={setDate} onClose={() => modalRef.current?.close()} />
            </AnimatedComponent>
        </View>
    );
};

export default memo(DatePickerInput);
