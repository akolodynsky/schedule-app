import React, { ReactNode, useRef } from 'react';
import { Pressable, Text, View } from 'react-native';

import { AnimatedComponent, AnimatedComponentRef } from "./AnimatedComponent";

import { colors } from "@/src/shared/constants";

import { ModalInputStyles } from "./styles";


interface ModalInputProps {
    title: string;
    children: (props: { onClose: () => void }) => ReactNode;
    renderContent?: ReactNode;
    backgroundColor?: string;
    placeholder?: string;
}

export const ModalInput = ({ children, title, renderContent, backgroundColor, placeholder }: ModalInputProps) => {
    const modalRef = useRef<AnimatedComponentRef>(null);

    const handleOpen = () => modalRef.current?.open();
    const handleClose = () => modalRef.current?.close();

    const bg = backgroundColor ? backgroundColor : colors.dark_100;

    return (
        <View>
            <Text style={ModalInputStyles.title}>{title}</Text>
            <Pressable onPress={handleOpen}>
                <View style={[ModalInputStyles.input, { backgroundColor: bg }]}>
                    {renderContent ?? <Text style={ModalInputStyles.placeholder}>{placeholder}</Text>}
                </View>
            </Pressable>

            <AnimatedComponent ref={modalRef} modalStyle={{ justifyContent: "center", alignItems: "center" }}>
                {children({onClose: handleClose})}
            </AnimatedComponent>
        </View>
    );
};



