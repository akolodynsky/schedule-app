import {Image, Pressable, Text, View} from "react-native";
import {icons} from "@/src/shared/constants/icons";
import React from "react";


interface WarnModal {
    title?: string,
    text: string,
    buttonText: string,
    onSubmit: () => void
    onClose: () => void
}

export const WarnModal = ({title, text, buttonText, onSubmit, onClose}: WarnModal) => {

    return (
        <View className="bg-dark-100 gap-8 px-2 py-9 rounded-[24px] items-center justify-center">
            <View className="gap-4 items-center justify-center">
                <Text className="font-inter_bold text-[22px] text-light-100">{title}</Text>

                <Image source={icons.warning} className="size-20"/>

                <View className="w-[90%]">
                    <Text className="font-inter_regular text-[15px] text-light-100">{text}</Text>
                </View>
            </View>

            <View className="flex-row gap-5 items-center">
                <Pressable onPress={() => onClose()} className="self-start rounded-xl px-6 py-2 flex-row items-center bg-light-300">
                    <Text className="font-inter_semibold text-light-100 text-[16px]">Cancel</Text>
                </Pressable>

                <Pressable onPress={() => {onSubmit(); onClose()}} className="rounded-xl px-6 py-2 flex-row items-center bg-primary">
                    <Text className="font-inter_semibold text-light-100 text-[16px]">{buttonText}</Text>
                </Pressable>
            </View>
        </View>
    )
};