import React, { memo } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated from "react-native-reanimated";
import { moderateScale } from "react-native-size-matters";

import { loadEvents } from "@/src/presentation/services/event";
import { colors, fonts, icons } from "@/src/shared/constants";
import { useAnimatedScale } from "@/src/shared/hooks";


interface DayCardProps extends IDay {
    focused: boolean,
    setSelectedDate: (date: string) => void,
    setDate: (date: string) => void,
}

const DayCard = ({ day, date, focused, setSelectedDate, setDate }: DayCardProps) => {
    const isToday = date === new Date().toLocaleDateString("sv-SE");

    const { animatedStyle, handlePressOut, handlePressIn } = useAnimatedScale();

    const handlePress = async () => {
        setSelectedDate(date);
        setDate(date);
        await loadEvents(date);
    };

    const bg = focused ? colors.primary : !focused && isToday ? colors.light_bg : colors.dark_200;
    const dotColor = isToday ? colors.light_100 : "transparent";

    return (
        <Pressable
            onPress={handlePress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
        >
            <Animated.View style={[animatedStyle, styles.container, { backgroundColor: bg }]}>
                <View style={styles.contentContainer}>
                    <Text style={[styles.date, (!focused && !isToday) && { marginBottom: moderateScale(2) }]}>
                        {date.split("-")[2]}
                    </Text>

                    <Text style={[focused || isToday ? styles.dayBig : styles.daySmall]}>
                        {day}
                    </Text>
                </View>

                <Image source={icons.dot} style={styles.image} tintColor={dotColor} />
            </Animated.View>
        </Pressable>
    );
};

export default memo(DayCard);



const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "space-between",
        width: moderateScale(42),
        paddingTop: moderateScale(10),
        paddingBottom: moderateScale(6),
        borderRadius: moderateScale(12)
    },
    contentContainer: {
        alignItems: "center"
    },
    date: {
        color: colors.light_100,
        fontFamily: fonts.inter_bold,
        fontSize: moderateScale(17),
    },
    dayBig: {
        color: colors.light_100,
        fontFamily: fonts.inter_medium,
        fontSize: moderateScale(10),
    },
    daySmall: {
        color: colors.light_200,
        fontFamily: fonts.inter_regular,
        fontSize: moderateScale(9),
    },
    image: {
        marginTop: moderateScale(5)
    }
});