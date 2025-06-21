import React, { ReactNode } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';

import { icons } from "@/src/shared/constants";

import { CustomModalStyles } from "./styles";


interface CustomModalProps {
    title: string;
    children: ReactNode;
    button?: () => void;
}

export const CustomModal = ({ children, title, button }: CustomModalProps) => {
    return (
        <View style={CustomModalStyles.container}>
            <View style={CustomModalStyles.header}>
                <Text style={CustomModalStyles.title}>{title}</Text>

                {button && (
                    <Pressable onPress={button}>
                        <Image source={icons.add} style={CustomModalStyles.image} />
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
