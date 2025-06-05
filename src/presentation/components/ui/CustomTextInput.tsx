import React from 'react';
import { Text, TextInput, View } from 'react-native';


interface TextInputProps {
    title: string;
    value: string;
    setValue: (value: string) => void;
    length?: number;
}

export const CustomTextInput = ({value, setValue, title, length}: TextInputProps) => {
    if (title === "task") {
        return (
            <TextInput
                maxLength={length}
                placeholder="Type a task"
                multiline
                cursorColor="#6f4bf7"
                selectionColor="rgba(111,75,247,0.3)"
                placeholderTextColor="#6b6f85"
                className="font-inter_regular text-light-100 w-[85%]"
                value={value}
                onChangeText={(text) => setValue(text)}
            />
        )
    }

    return (
        <View className="mb-5">
            <Text className="text-light-200 font-inter_medium mb-3">{title}</Text>
            <TextInput
                maxLength={length}
                placeholder={`Type a ${title.toLowerCase()}`}
                multiline
                cursorColor="#6f4bf7"
                selectionColor="rgba(111,75,247,0.3)"
                placeholderTextColor="#6b6f85"
                className="bg-dark-100 rounded-lg px-4 py-6 font-inter_regular text-light-100"
                value={value}
                onChangeText={(text) => setValue(text)}
            />
        </View>
    );
};
