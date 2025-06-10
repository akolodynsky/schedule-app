import React from 'react';
import { StatusBar } from "expo-status-bar";
import { View, Text, Image } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";

import { images } from "@/src/shared/constants";


export const SplashScreenView = () => {
    return (
        <>
            <StatusBar hidden />

            <LinearGradient
                colors={['#1a1a24', '#6f4bf7']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 10 }}
                style={{ flex: 1 }}
            >
                <View className="flex-1 justify-center items-center">
                    <View className="bg-primary mt-[-5rem] mb-4 p-2 rounded-3xl">
                        <Image source={images.logo} className="size-16" />
                    </View>

                    <Text className="font-inter_bold text-light-100 text-[2.4rem]">SantiTime</Text>
                    <Text className="font-inter_medium text-light-100 text-sm tracking-widest mt-[-0.25rem]">Plan your day</Text>
                </View>
            </LinearGradient>
        </>

    );
};
