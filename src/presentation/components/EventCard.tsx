import React from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import Animated from "react-native-reanimated";
import { moderateScale } from "react-native-size-matters";

import CategoryCard from "./CategoryCard";

import { getDuration, isCurrentTime } from "@/src/shared/utils";
import { useAnimatedScale } from "@/src/shared/hooks";
import { colors, fonts } from "@/src/shared/constants";


const EventCard = (props: (IEvent | IGap) & { first: number, handlePress: () => void }) => {
    const { start, end, first, handlePress } = props;

    const { animatedStyle, handlePressOut, handlePressIn } = useAnimatedScale();

    const duration = start && end && getDuration(start, end);
    const firstEvent = first === 0;
    const currentEvent = isCurrentTime(start, end);
    const bg = currentEvent ? colors.light_100 : colors.light_200;

    const isUserEvent = "category" in props;

    const onPress = () => {
        handlePressIn();
        handlePress();

        setTimeout(() => {
            handlePressOut();
        }, 50);
    };


    return (
        <Pressable style={styles.buttonContainer} onPress={onPress}>
            {firstEvent && <Text style={styles.timeText}>{start}</Text>}

            <Animated.View style={[animatedStyle, styles.cardContainer, { borderColor: bg } ]}>
                {isUserEvent &&
                    <>
                        <View style={styles.headerContainer}>
                            <View style={styles.categoryContainer}>
                                <CategoryCard category={props.category} />
                            </View>

                            {props.tasksCount > 0 &&
                                <View style={styles.taskContainer}>
                                    <Text style={styles.countText}>
                                        {props.tasksCount} Task{props.tasksCount > 1 && 's'}
                                    </Text>
                                </View>
                            }
                        </View>

                        {props.name &&
                            <Text style={styles.nameText}>{props.name}</Text>
                        }

                        {props.description &&
                            <Text style={styles.descText} numberOfLines={2}>{props.description}</Text>
                        }
                    </>
                }

                <Text style={styles.durationText}>{duration}</Text>
            </Animated.View>

            <Text style={styles.timeText}>{end}</Text>
        </Pressable>
    );
};

export default EventCard;



const styles = StyleSheet.create({
    buttonContainer: { marginBottom: moderateScale(2) },
    timeText: {
        color: colors.light_300,
        fontFamily: fonts.inter_medium,
        fontSize: moderateScale(10)
    },
    cardContainer: {
        alignSelf: 'flex-end',
        borderWidth: moderateScale(2),
        borderRadius: moderateScale(16),
        width: '83%',
        paddingHorizontal: moderateScale(10),
        paddingVertical: moderateScale(12),
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: moderateScale(8)
    },
    categoryContainer: { maxWidth: '70%' },
    taskContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.dark_100,
        alignSelf: 'flex-start',
        paddingHorizontal: moderateScale(14),
        paddingVertical: moderateScale(6),
        borderRadius: moderateScale(34)
    },
    countText: {
        color: colors.light_100,
        fontFamily: fonts.inter_medium,
        fontSize: moderateScale(11)
    },
    nameText: {
        color: colors.light_100,
        fontFamily: fonts.inter_bold,
        fontSize: moderateScale(16),
        marginBottom: moderateScale(6)
    },
    descText: {
        color: colors.light_100,
        fontFamily: fonts.inter_regular,
        fontSize: moderateScale(12),
        marginBottom: moderateScale(10),
        lineHeight: moderateScale(15)
    },
    durationText: {
        color: colors.light_100,
        fontFamily: fonts.inter_bold,
        fontSize: moderateScale(12)
    }
});