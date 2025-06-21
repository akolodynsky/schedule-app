import React, { useRef } from 'react';
import { Image, Pressable, View } from 'react-native';

import { AnimatedComponent, AnimatedComponentRef } from "./AnimatedComponent";
import SideMenu from "../SideMenu";

import { icons } from "@/src/shared/constants";

import { SideMenuModalStyles } from "./styles";


export const SideMenuModal = () => {
    const modalRef = useRef<AnimatedComponentRef>(null);

    const handlePress = () => {
        modalRef.current?.open()
    }

    return (
        <>
            <Pressable style={SideMenuModalStyles.buttonContainer} onPress={handlePress}>
                <Image source={icons.menu} style={SideMenuModalStyles.buttonImage} />
            </Pressable>

            <View style={SideMenuModalStyles.container}>
                <AnimatedComponent ref={modalRef} horizontal contentStyle={{ alignItems: "flex-end" }}>
                    <SideMenu onClose={() => modalRef.current?.close()} />
                </AnimatedComponent>
            </View>
        </>

    );
};
