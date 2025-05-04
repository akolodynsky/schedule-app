import React from 'react';
import {StatusBar} from "expo-status-bar";
import {View, Image, ImageBackground} from 'react-native';

import {images} from "@/src/shared/constants/images";

const SplashScreenView = () => {
    return (
        <View className="flex-1 justify-center items-center">
            <StatusBar hidden />
            <ImageBackground source={images.splash} className="flex-1 w-full h-full scale-105 justify-center items-center" resizeMode="cover">
                <Image source={images.logo} className="w-[200px]" resizeMode="contain" />
            </ImageBackground>
        </View>
    );
};

export default SplashScreenView;
