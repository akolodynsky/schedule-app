import React from "react";
import { Text, View } from "react-native";

import { WarnMessageStyles } from "./styles";


export const WarnMessage = () => {

    return (
        <View style={WarnMessageStyles.container}>
            <Text style={WarnMessageStyles.text}>This page only mock-up</Text>
        </View>
    )
};