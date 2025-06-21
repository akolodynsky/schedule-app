import React from 'react';
import { Image, Pressable } from 'react-native';
import { router } from "expo-router";

import { icons } from "@/src/shared/constants";

import { AddButtonStyles } from "./styles";


export const AddButton = () => {
    return (
        <Pressable
            onPress={() => router.push("/create")}
            style={AddButtonStyles.button}
        >
            <Image source={icons.add} style={AddButtonStyles.image} />
        </Pressable>
    );
};
