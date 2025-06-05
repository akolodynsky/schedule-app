import React from 'react';
import { Image, Pressable } from 'react-native';
import { router } from "expo-router";

import { icons } from "@/src/shared/constants";


export const AddButton = () => {
    return (
        <Pressable
            onPress={() => router.push("/create")}
            className="absolute bottom-8 right-8 z-10 bg-primary rounded-full p-3"
        >
            <Image source={icons.add} className="size-12" />
        </Pressable>
    );
};
