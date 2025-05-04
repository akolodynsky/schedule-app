import React, {useRef} from "react";
import {Image, Pressable, Text, View} from "react-native";

import AnimatedComponent, {AnimatedComponentRef} from "@/src/presentation/components/ui/AnimatedComponent";
import DatePicker from "@/src/presentation/components/ui/DatePicker";
import {icons} from "@/src/shared/constants/icons";
import {formatDate} from "../../shared/utils";
import {RepeatIntervalModal} from "@/src/presentation/components/RepeatIntervalModal";
import {useRecurringOptionsStore} from "@/src/presentation/stores/useRecurringOptionsStore";
import {useShallow} from "zustand/react/shallow";


export const LimitDateSection = () => {
    const dateModalRef = useRef<AnimatedComponentRef>(null);

    const { endRepeat, setEndRepeat} = useRecurringOptionsStore(
        useShallow((state) => ({
            endRepeat: state.endRepeat,
            setEndRepeat: state.setEndRepeat,
        }))
    );

    return (
        <View className="flex-1">
            <Text className="text-light-200 font-inter_medium mb-2">Limit</Text>
            <Pressable
                className="bg-dark-200 p-3 rounded-3xl items-center justify-center"
                onPress={() => dateModalRef.current?.open()}
            >
                <Text className="font-inter_medium text-[15px] text-light-100">
                    {endRepeat ? formatDate(endRepeat) : "No Limit"}
                </Text>

                <AnimatedComponent ref={dateModalRef} modalStyle="justify-center items-center">
                    <DatePicker
                        date={endRepeat}
                        setDate={setEndRepeat}
                        onClose={() => dateModalRef.current?.close()}
                    />
                </AnimatedComponent>
            </Pressable>
        </View>
    )
};


export const IntervalSection = () => {
    const intervalModalRef = useRef<AnimatedComponentRef>(null);

    const { frequency, interval, setInterval} = useRecurringOptionsStore(
        useShallow((state) => ({
            frequency: state.frequency,
            interval: state.interval,
            setInterval: state.setInterval,
        }))
    );

    const handleCount = (type: string) => {
        switch (type) {
            case "plus":
                if (interval < 99) return setInterval(interval + 1);
                return setInterval(99);
            case "minus":
                if (interval > 1) return setInterval(interval - 1);
                return setInterval(1);
        }
    }

    return (
        <View className="flex-1">
            <View className="flex-row justify-between mb-2 items-center">
                <Text className="text-light-200 font-inter_medium">Interval</Text>

                <View className="flex-row gap-3">
                    <Pressable onPress={() => intervalModalRef.current?.open()}>
                        <Image source={icons.keyboard} className="size-5" />
                    </Pressable>

                    <Pressable onPress={() => handleCount("plus")}>
                        <Image source={icons.plus} className="size-5" />
                    </Pressable>

                    <Pressable onPress={() => handleCount("minus")}>
                        <Image source={icons.minus} className="size-5" />
                    </Pressable>

                    <AnimatedComponent ref={intervalModalRef} modalStyle="justify-center items-center">
                        <RepeatIntervalModal
                            interval={interval}
                            setInterval={setInterval}
                            onClose={() => intervalModalRef.current?.close()}
                        />
                    </AnimatedComponent>
                </View>
            </View>

            <View className="bg-dark-200 p-3 rounded-3xl items-center">
                <Text className="font-inter_medium text-[15px] text-light-100">
                    Every {interval}
                    {frequency === "daily"
                        ? " day"
                        : frequency === "weekly"
                            ? " week"
                            : " month"}
                    {interval > 1 && "s"}
                </Text>
            </View>
        </View>
    )
};