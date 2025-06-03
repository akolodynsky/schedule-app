import React, { useEffect, useRef, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";


interface RepeatIntervalModal {
    interval: number,
    setInterval: (number: number) => void,
    onClose: () => void
}

export const RepeatIntervalModal = ({interval, setInterval, onClose}: RepeatIntervalModal) => {
    const [value, setValue] = useState(interval.toString());

    const inputRef = useRef<TextInput>(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            inputRef.current?.focus();
        }, 100);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <View className="bg-dark-100 gap-7 px-6 py-5 rounded-[24px] items-center justify-center">
            <View className="flex-row items-center gap-7">
                <Text className="font-inter_regular text-xl text-light-100">Select Interval:</Text>

                <View className="border-2 border-primary rounded-lg px-3 items-center w-16">
                    <TextInput
                        ref={inputRef}
                        value={value}
                        onChangeText={(text) => {
                            const numbers = text.replace(/[^0-9]/g, '');
                            setValue(numbers);
                        }}
                        keyboardType="numeric"
                        className="text-light-100 text-xl font-inter_regular"
                        cursorColor="#6f4bf7"
                        selectionColor="rgba(111,75,247,0.2)"
                        maxLength={2}
                    />
                </View>
            </View>

            <View className="flex-row self-end gap-5 items-center">
                <Pressable onPress={() => onClose()}>
                    <Text className="font-inter_medium text-[14px] text-primary">Cancel</Text>
                </Pressable>

                <Pressable onPress={() => {
                    if (value && value !== "0") setInterval(parseInt(value))
                    onClose();
                }}>
                    <Text className="font-inter_medium text-[15px] text-primary">OK</Text>
                </Pressable>
            </View>
        </View>
    )
};