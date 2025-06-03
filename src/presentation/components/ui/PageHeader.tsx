import React from 'react';
import {Text, View} from 'react-native';
import Svg, { Rect, Circle, Defs, Mask } from 'react-native-svg';


const PageHeader = ({ name }: {name: string}) => {
    return (
        <>
            <View className="rounded-bl-[72px] pt-12 bg-dark-100 pb-7 absolute z-10 w-full">
                <View className="mt-7 items-center">
                    <Text className="text-light-100 font-inter_bold text-3xl">{name}</Text>
                </View>
            </View>

            <View className="absolute top-[8.5rem] right-0 w-[66px] h-[66px] z-10">
                <Svg width="68" height="68">
                    <Defs>
                        <Mask id="mask">
                            <Rect x="0" y="0" width="68" height="68" fill="white" />
                            <Circle cx="0" cy="68" r="64" fill="black" />
                        </Mask>
                    </Defs>

                    <Rect width="68" height="68" fill="#1a1a24" mask="url(#mask)" />
                </Svg>
            </View>
        </>

    );
};

export default PageHeader;
