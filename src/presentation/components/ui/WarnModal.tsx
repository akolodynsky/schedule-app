import React, { forwardRef } from "react";
import { Image, Pressable, Text, View } from "react-native";

import { AnimatedComponent, AnimatedComponentRef } from "./AnimatedComponent";

import { icons, colors } from "@/src/shared/constants";

import { WarnModalStyles } from "./styles";


interface WarnModalProps {
    title?: string,
    text: string,
    buttonText: string,
    onSubmit: () => void
    onClose: () => void
}

export const WarnModal = forwardRef<AnimatedComponentRef, WarnModalProps>(
    ({ title, text, buttonText, onSubmit, onClose }, ref) => {

    return (
        <AnimatedComponent ref={ref} modalStyle={{ justifyContent: "center", alignItems: "center" }}>
            <View style={WarnModalStyles.container}>
                <View style={WarnModalStyles.contentContainer}>
                    <Text style={WarnModalStyles.title}>{title}</Text>

                    <Image source={icons.warning} style={WarnModalStyles.image}/>

                    <View style={WarnModalStyles.textContainer}>
                        <Text style={WarnModalStyles.text}>{text}</Text>
                    </View>
                </View>

                <View style={WarnModalStyles.buttonContainer}>
                    <Pressable onPress={() => onClose()} style={[WarnModalStyles.button, { backgroundColor: colors.light_300 }]}>
                        <Text style={WarnModalStyles.buttonText}>Cancel</Text>
                    </Pressable>

                    <Pressable onPress={() => {onSubmit(); onClose()}} style={[WarnModalStyles.button, { backgroundColor: colors.primary }]}>
                        <Text style={WarnModalStyles.buttonText}>{buttonText}</Text>
                    </Pressable>
                </View>
            </View>
        </AnimatedComponent>
    )
});