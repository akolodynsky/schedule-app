import React, { memo, useRef } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useShallow } from "zustand/react/shallow";
import { moderateScale } from "react-native-size-matters";

import { AnimatedComponent, AnimatedComponentRef, DatePicker } from "./ui";

import { useDateStore } from "../stores";
import { formatDate } from "@/src/shared/utils";
import { colors, fonts } from "@/src/shared/constants";


const DatePickerInput = ({ align = 'center' }: { align?: 'center' | 'left' }) => {
    const { date, setDate } = useDateStore(
        useShallow(s => ({
            date: s.date,
            setDate: s.setDate,
        }))
    );

    const modalRef = useRef<AnimatedComponentRef>(null);

    return (
        <View>
            <Text style={styles.title}>Date</Text>
            <Pressable onPress={() => modalRef.current?.open()}>
                <Text style={[styles.textInput, { textAlign: align }]} numberOfLines={1}>{formatDate(date)}</Text>
            </Pressable>
            <AnimatedComponent ref={modalRef} modalStyle={{ justifyContent: "center", alignItems: "center" }}>
                <DatePicker date={date} setDate={setDate} onClose={() => modalRef.current?.close()} />
            </AnimatedComponent>
        </View>
    );
};

export default memo(DatePickerInput);



const styles = StyleSheet.create({
    title: {
        color: colors.light_200,
        fontFamily: fonts.inter_medium,
        marginBottom: moderateScale(10)
    },
    textInput: {
        backgroundColor: colors.dark_100,
        borderRadius: moderateScale(6),
        paddingHorizontal: moderateScale(15),
        paddingVertical: moderateScale(20),
        color: colors.light_100,
        fontFamily: fonts.inter_regular,
        fontSize: moderateScale(15)
    }
});