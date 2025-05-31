import React, {ReactNode} from 'react';
import {Image, Pressable, ScrollView, Text, View} from 'react-native';

import {icons} from "@/src/shared/constants/icons";


interface CustomModalProps {
    title: string;
    children: ReactNode;
    button?: () => void;
}

const CustomModal = ({children, title, button}: CustomModalProps) => {
    return (
        <View className="w-[300px] max-h-[650px] px-5 py-8 bg-dark-200 rounded-[24px]">
            <View className="flex-row justify-between mb-8">
                <Text className="font-inter_semibold text-2xl text-light-100">{title}</Text>

                {button && (
                    <Pressable onPress={button}>
                        <Image source={icons.add} className="size-9" />
                    </Pressable>
                )}
            </View>

            <ScrollView
                contentContainerStyle={{ gap: 20 }}
                showsVerticalScrollIndicator={false}
                overScrollMode="never"
            >
                {children}
            </ScrollView>
        </View>
    );
};

export default CustomModal;
