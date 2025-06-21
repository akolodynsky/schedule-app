import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useShallow } from "zustand/react/shallow";
import { moderateScale } from "react-native-size-matters";

import { AnimatedComponent, AnimatedComponentRef, DatePicker } from "./ui";
import DayCard from "./DayCard";

import { useDateStore } from "../stores";
import { useDayListActions } from "@/src/shared/hooks";
import { generateWeeks } from "@/src/shared/utils";
import { colors, fonts } from "@/src/shared/constants";


const { width } = Dimensions.get("window");

const DayList = () => {

    const { selectedDate, setSelectedDate, setDate } = useDateStore(
        useShallow((s) => ({
            selectedDate: s.selectedDate,
            setSelectedDate: s.setSelectedDate,
            setDate: s.setDate,
        }))
    );

    const [weeks, setWeeks] = useState<IDay[][]>([]);
    const [currentMonth, setCurrentMonth] = useState("");


    useEffect(() => {
        if (!selectedDate) return;

        const index = weeks.findIndex(week => week.some(day => day.date === selectedDate));

        if (index !== -1) {
            scrollToIndex(index);
        } else {
            const baseDate = new Date(selectedDate);
            setWeeks(generateWeeks(baseDate))
            scrollToIndex(3);
        }
    }, [selectedDate]);

    const { handleEndReached, handleViewableItemsChanged, flatListRef, scrollToIndex, handleStartReached } = useDayListActions({
        weeks,
        setWeeks,
        setCurrentMonth
    });

    const renderWeeks = ({ item, index }: { item: IDay[], index: number }) => {
        return (
            <View style={[styles.weekContainer, { width: width - 36 }]} key={index}>
                {item.map((day) => (
                    <DayCard
                        key={day.date}
                        {...day}
                        focused={day.date === selectedDate}
                        setSelectedDate={setSelectedDate}
                        setDate={setDate}
                    />
                ))}
            </View>
        )
    };

    const modalRef = useRef<AnimatedComponentRef>(null);

    return (
        <View style={styles.container}>
            <View style={styles.monthContainer}>
                <Pressable style={styles.button} onPress={() => modalRef.current?.open()}>
                    <Text style={styles.buttonText}>{currentMonth}</Text>
                </Pressable>

                <AnimatedComponent ref={modalRef} modalStyle={{ justifyContent: "center", alignItems: "center" }}>
                    <DatePicker date={selectedDate} setDate={setSelectedDate} onClose={() => modalRef.current?.close()} />
                </AnimatedComponent>
            </View>

            {weeks.length > 2 && (
                <View style={styles.listContainer}>
                    <FlatList
                        ref={flatListRef}
                        data={weeks}
                        keyExtractor={(week) => week[0].date}
                        renderItem={renderWeeks}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        onStartReached={handleStartReached}
                        onStartReachedThreshold={0.2}
                        onEndReached={handleEndReached}
                        onEndReachedThreshold={0.2}
                        initialNumToRender={7}
                        maxToRenderPerBatch={5}
                        windowSize={5}
                        snapToInterval={width - 36}
                        decelerationRate="fast"
                        bounces={false}
                        overScrollMode="never"
                        onViewableItemsChanged={handleViewableItemsChanged}
                        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
                        initialScrollIndex={3}
                        getItemLayout={(_, index) => ({
                            length: width - 36,
                            offset: (width - 36) * index,
                            index,
                        })}
                        scrollEventThrottle={16}
                    />
                </View>
            )}
        </View>
    );
};

export default DayList;



const styles = StyleSheet.create({
    container: {
        borderBottomLeftRadius: moderateScale(70),
        paddingVertical: moderateScale(56),
        backgroundColor: colors.dark_100
    },
    listContainer: {
        paddingHorizontal: moderateScale(17)
    },
    weekContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: moderateScale(5)
    },
    monthContainer: {
        paddingBottom: moderateScale(32),
        paddingHorizontal: moderateScale(20)
    },
    button: {
        alignSelf: 'flex-start'
    },
    buttonText: {
        color: colors.light_100,
        fontFamily: fonts.inter_semibold,
        fontSize: moderateScale(20)
    },
});