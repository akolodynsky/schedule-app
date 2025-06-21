import React from 'react';
import { Text, TextInput, View } from 'react-native';

import { CustomTextInputStyles } from "./styles";
import { colors } from '@/src/shared/constants';


interface TextInputProps {
    title: string;
    value: string;
    setValue: (value: string) => void;
    length?: number;
}

export const CustomTextInput = ({ value, setValue, title, length }: TextInputProps) => {
    if (title === "task") {
        return (
            <TextInput
                maxLength={length}
                placeholder="Type a task"
                multiline
                cursorColor={colors.primary}
                selectionColor={colors.light_bg}
                placeholderTextColor={colors.light_300}
                style={CustomTextInputStyles.taskInput}
                value={value}
                onChangeText={(text) => setValue(text)}
            />
        )
    }

    return (
        <View>
            <Text style={CustomTextInputStyles.title}>{title}</Text>
            <TextInput
                maxLength={length}
                placeholder={`Type a ${title.toLowerCase()}`}
                multiline
                cursorColor={colors.primary}
                selectionColor={colors.light_bg}
                placeholderTextColor={colors.light_300}
                style={CustomTextInputStyles.input}
                value={value}
                onChangeText={(text) => setValue(text)}
            />
        </View>
    );
};
