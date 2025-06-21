import React, { useRef } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useShallow } from "zustand/react/shallow";
import { moderateScale, scale } from "react-native-size-matters";

import { AnimatedComponent, AnimatedComponentRef, DatePicker } from "./ui";
import { RepeatIntervalModal } from "./RepeatIntervalModal";

import { useRecurringOptionsStore } from "../stores";
import { icons, colors, fonts } from "@/src/shared/constants";
import { formatDate } from "@/src/shared/utils";


export const LimitDateSection = () => {
    const dateModalRef = useRef<AnimatedComponentRef>(null);

    const { endRepeat, setEndRepeat } = useRecurringOptionsStore(
        useShallow((s) => ({
            endRepeat: s.endRepeat,
            setEndRepeat: s.setEndRepeat,
        }))
    );

    return (
        <View style={styles.container}>
            <Text style={[styles.title, { marginBottom: moderateScale(8) }]}>Limit</Text>
            <Pressable
                style={styles.cardContainer}
                onPress={() => dateModalRef.current?.open()}
            >
                <Text style={styles.cardText} numberOfLines={1}>
                    {endRepeat ? formatDate(endRepeat) : "No Limit"}
                </Text>

                <AnimatedComponent ref={dateModalRef} modalStyle={{ justifyContent: "center", alignItems: "center" }}>
                    <DatePicker
                        date={endRepeat!}
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
        useShallow((s) => ({
            frequency: s.frequency,
            interval: s.interval,
            setInterval: s.setInterval,
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
        <View style={styles.container}>
            <View  style={styles.headerContainer}>
                <Text style={styles.title}>Interval</Text>

                <View style={styles.buttonsContainer}>
                    <Pressable onPress={() => intervalModalRef.current?.open()}>
                        <Image source={icons.keyboard} style={styles.buttonImage} />
                    </Pressable>

                    <Pressable onPress={() => handleCount("plus")}>
                        <Image source={icons.plus} style={styles.buttonImage} />
                    </Pressable>

                    <Pressable onPress={() => handleCount("minus")}>
                        <Image source={icons.minus} style={styles.buttonImage} />
                    </Pressable>

                    <AnimatedComponent ref={intervalModalRef} modalStyle={{ justifyContent: "center", alignItems: "center" }}>
                        <RepeatIntervalModal
                            interval={interval}
                            setInterval={setInterval}
                            onClose={() => intervalModalRef.current?.close()}
                        />
                    </AnimatedComponent>
                </View>
            </View>

            <View style={styles.cardContainer}>
                <Text style={styles.cardText}>
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


const styles = StyleSheet.create({
    container: { flex: 1 },
    title: {
        fontFamily: fonts.inter_medium,
        color: colors.light_200
    },
    cardContainer: {
        backgroundColor: colors.dark_200,
        padding: moderateScale(10),
        borderRadius: moderateScale(22),
        alignItems: 'center'
    },
    cardText: {
        fontFamily: fonts.inter_medium,
        color: colors.light_100,
        fontSize: moderateScale(14)
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: moderateScale(8)
    },
    buttonsContainer: {
        flexDirection: 'row',
        gap: moderateScale(10)
    },
    buttonImage: { width: scale(15), height: scale(15) }
});