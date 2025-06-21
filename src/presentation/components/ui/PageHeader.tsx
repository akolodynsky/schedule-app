import React from 'react';
import { Text, View } from 'react-native';
import Svg, { Rect, Circle, Defs, Mask } from 'react-native-svg';

import { PageHeaderStyles } from "./styles";


export const PageHeader = ({ text }: { text: string }) => {
    return (
        <>
            <View style={PageHeaderStyles.container}>
                <View style={PageHeaderStyles.textContainer}>
                    <Text style={PageHeaderStyles.text}>{text}</Text>
                </View>
            </View>

            <View style={PageHeaderStyles.svgContainer}>
                <Svg width="68" height="68">
                    <Defs>
                        <Mask id="mask">
                            <Rect x="0" y="0" width="68" height="68" fill="white" />
                            <Circle cx="0" cy="68" r="62" fill="black" />
                        </Mask>
                    </Defs>

                    <Rect width="68" height="68" fill="#1a1a24" mask="url(#mask)" />
                </Svg>
            </View>
        </>

    );
};
