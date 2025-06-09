import React, { ReactNode, useRef } from 'react';
import { Pressable, Text, View } from 'react-native';

import { AnimatedComponent, AnimatedComponentRef } from "./AnimatedComponent";


interface ModalInputProps {
    title: string;
    children: (props: { onClose: () => void }) => ReactNode;
    renderContent?: ReactNode;
    backgroundColor?: string;
    placeholder?: string;
}

export const ModalInput = ({children, title, renderContent, backgroundColor, placeholder}: ModalInputProps) => {
    const modalRef = useRef<AnimatedComponentRef>(null);

    const handleOpen = () => modalRef.current?.open();
    const handleClose = () => modalRef.current?.close();

    const bg = backgroundColor ? backgroundColor : "#1a1a24";

    return (
        <View className="mb-5">
            <Text className="text-light-200 font-inter_medium mb-3">{title}</Text>
            <Pressable onPress={handleOpen}>
                <View style={{backgroundColor: bg}} className="rounded-lg px-4 pt-[21px] pb-[20px]">
                    {renderContent ?? (
                        <Text className="font-inter_regular text-[14px] text-light-300">{placeholder}</Text>
                    )}
                </View>
            </Pressable>

            <AnimatedComponent ref={modalRef} modalStyle="items-center justify-center">
                {children({onClose: handleClose})}
            </AnimatedComponent>
        </View>

    );
};
