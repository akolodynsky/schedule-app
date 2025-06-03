import React, { memo } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import Animated from "react-native-reanimated";

import { icons } from "@/src/shared/constants";
import { useAnimatedScale } from "@/src/shared/hooks";


interface DayCardProps extends IDay {
    focused: boolean,
    setSelectedDate: (date: string) => void,
    setDate: (date: string) => void,
}

const DayCard = ({day, date, focused, setSelectedDate, setDate}: DayCardProps) => {
    const isToday = date === new Date().toISOString().split("T")[0];

    const {animatedStyle, handlePressOut, handlePressIn} = useAnimatedScale();

    const handlePress = () => {
        setSelectedDate(date);
        setDate(date);
    }

    const bg = focused ? 'bg-primary' : !focused && isToday ? 'bg-light_bg' : 'bg-dark-200';
    const dateText = !focused && !isToday && 'mb-1';
    const dayText = focused || isToday ? 'text-sm text-light-100' : 'text-xs text-light-200';
    const dotColor = isToday ? "#efeff9" : "transparent";

    return (
        <Pressable
            onPress={handlePress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
        >
            <Animated.View
                style={animatedStyle}
                className={`items-center justify-between w-[44px] pt-3 pb-2 rounded-2xl ${bg}`}
            >
                <View className="items-center">
                    <Text className={`font-inter_bold text-xl text-light-100 ${dateText}`}>
                        {date.split("-")[2]}
                    </Text>

                    <Text className={`font-inter_regular ${dayText}`}>
                        {day}
                    </Text>
                </View>

                <Image source={icons.dot} className="mt-2" tintColor={dotColor} />
            </Animated.View>
        </Pressable>
    );
};

export default memo(DayCard);
