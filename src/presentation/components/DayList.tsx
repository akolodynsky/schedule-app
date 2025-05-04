import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, FlatList, Pressable, Text, View} from 'react-native';
import {useShallow} from "zustand/react/shallow";

import AnimatedComponent, {AnimatedComponentRef} from "@/src/presentation/components/ui/AnimatedComponent";
import DayCard from "@/src/presentation/components/DayCard";
import DatePicker from "@/src/presentation/components/ui/DatePicker";
import {useDayListActions} from "../../shared/hooks";
import {generateWeeks} from "../../shared/utils";
import {useDateStore} from "../stores";


const { width } = Dimensions.get("window");

const DayList = () => {

    const { selectedDate, setSelectedDate, setDate } = useDateStore(
        useShallow((state) => ({
            selectedDate: state.selectedDate,
            setSelectedDate: state.setSelectedDate,
            setDate: state.setDate,
        }))
    );

    const [weeks, setWeeks] = useState<Day[][]>([]);
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

    const {handleEndReached, handleViewableItemsChanged, flatListRef, scrollToIndex, handleStartReached} = useDayListActions({
        weeks,
        setWeeks,
        setCurrentMonth
    });

    const renderWeeks = ({ item, index }: {item: Day[], index: number}) => {
        return (
            <View className="flex-row justify-between px-1" style={{width: width - 36}} key={index}>
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
        <View className="rounded-bl-[76px] pt-16 bg-dark-100 pb-16">
            <View className="mb-9 px-5">
                <Pressable className="self-start" onPress={() => modalRef.current?.open()}>
                    <Text className="text-light-100 font-inter_semibold text-2xl">{currentMonth}</Text>
                </Pressable>

                <AnimatedComponent ref={modalRef} modalStyle="justify-center items-center">
                    <DatePicker date={selectedDate} setDate={setSelectedDate} onClose={() => modalRef.current?.close()} />
                </AnimatedComponent>
            </View>

            {weeks.length > 2 && (
                <View className="px-5">
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