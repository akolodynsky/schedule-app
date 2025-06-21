import React, { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { moderateScale, scale } from "react-native-size-matters";

import { colors, fonts } from "@/src/shared/constants";


interface RepeatIntervalModal {
    interval: number,
    setInterval: (number: number) => void,
    onClose: () => void
}

export const RepeatIntervalModal = ({ interval, setInterval, onClose }: RepeatIntervalModal) => {
    const [value, setValue] = useState(interval.toString());

    const inputRef = useRef<TextInput>(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            inputRef.current?.focus();
        }, 100);

        return () => clearTimeout(timeout);
    }, []);

    const handleSubmit = () => {
        if (value && value !== "0") setInterval(parseInt(value))
        onClose();
    }

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Text style={styles.text}>Select Interval:</Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        ref={inputRef}
                        value={value}
                        onChangeText={(text) => {
                            const numbers = text.replace(/[^0-9]/g, '');
                            setValue(numbers);
                        }}
                        keyboardType="numeric"
                        style={styles.text}
                        cursorColor={colors.primary}
                        selectionColor={colors.light_bg}
                        maxLength={2}
                        onSubmitEditing={handleSubmit}
                    />
                </View>
            </View>

            <View style={styles.buttonsContainer}>
                <Pressable onPress={() => onClose()}>
                    <Text style={[styles.buttonText, { fontSize: moderateScale(13) }]}>Cancel</Text>
                </Pressable>

                <Pressable onPress={handleSubmit}>
                    <Text style={[styles.buttonText, { fontSize: moderateScale(14) }]}>OK</Text>
                </Pressable>
            </View>
        </View>
    )
};



const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.dark_100,
        gap: moderateScale(26),
        paddingHorizontal: moderateScale(22),
        paddingVertical: moderateScale(18),
        borderRadius: moderateScale(22),
        alignItems: 'center',
        justifyContent: 'center'
    },
    contentContainer: {
        flexDirection: 'row',
        gap: moderateScale(26),
        alignItems: 'center',
    },
    text: {
        fontFamily: fonts.inter_regular,
        color: colors.light_100,
        fontSize: moderateScale(18)
    },
    inputContainer: {
        borderWidth: moderateScale(2),
        borderColor: colors.primary,
        borderRadius: moderateScale(6),
        paddingHorizontal: moderateScale(10),
        width: scale(50),
        height: scale(44),
        alignItems: 'center'
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        alignSelf: 'flex-end',
        gap: moderateScale(18)
    },
    buttonText: { fontFamily: fonts.inter_medium, color: colors.primary },
});