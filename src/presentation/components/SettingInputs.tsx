import React, { ReactNode, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox/lib";
import { moderateScale } from "react-native-size-matters";

import { AnimatedComponent, AnimatedComponentRef, CustomModal } from "./ui";

import { colors, fonts } from "@/src/shared/constants";


export const SettingModal = ({ title, options }: { title: string, options: string[] }) => {
    const [selectedOption, setSelectedOption] = useState(options[0]);
    const modalRef = useRef<AnimatedComponentRef>(null);

    const selectOption = (option: string) => {
        setSelectedOption(option);
        modalRef.current?.close();
    };

    return (
        <>
            <AnimatedComponent ref={modalRef} modalStyle={{ justifyContent: "center", alignItems: "center" }}>
                <CustomModal title={title}>
                    {options.map((option) => (
                        <BouncyCheckbox
                            key={option}
                            size={moderateScale(16)}
                            fillColor={colors.primary}
                            innerIconStyle={{ borderWidth: moderateScale(2) }}
                            textStyle={styles.checkBox}
                            text={option}
                            isChecked={option === selectedOption}
                            useBuiltInState={false}
                            onPress={() => selectOption(option)}
                        />
                    ))}
                </CustomModal>
            </AnimatedComponent>

            <SettingInput title={title} press={() => modalRef.current?.open()}>
                <Text style={[styles.title, { color: colors.light_300 }]}>
                    {selectedOption}
                </Text>
            </SettingInput>
        </>
    );
};


export const SettingCheck = ({ title }: { title: string}) => {
    const [checked, setChecked] = useState(false);

    return (
        <SettingInput title={title} press={() => setChecked(!checked)}>
            <BouncyCheckbox
                size={20}
                fillColor={colors.primary}
                innerIconStyle={{ borderWidth: moderateScale(2) }}
                isChecked={checked}
                useBuiltInState={false}
                onPress={() => setChecked(!checked)}
                disableText
            />
        </SettingInput>
    );
};


export const SettingDual = ({ title, options }: { title: string, options: string[] }) => {
    const [selectedOption, setSelectedOption] = useState(options[0]);

    return (
        <SettingInput title={title} small>
            <View style={styles.dualContainer}>
                {options.map(option => (
                    <Pressable key={option} onPress={() => setSelectedOption(option)}>

                        <View style={[styles.dualButton, selectedOption !== option && { backgroundColor: colors.dark_200 }]}>
                            <Text style={[styles.title, selectedOption !== option && { color: colors.light_300 }]}>
                                {option}
                            </Text>
                        </View>

                    </Pressable>
                ))}
            </View>
        </SettingInput>
    );
};


export const SettingInput =
    ({ title, children, press, small }: { title: string, children?: ReactNode, press?: () => void, small?: boolean }) => {

    return (
        <Pressable onPress={press} style={[styles.inputContainer, small && { paddingVertical: moderateScale(10) }]}>
            <Text style={styles.title}>{title}</Text>

            {children}
        </Pressable>
    );
};



const styles = StyleSheet.create({
    checkBox: {
        fontFamily: fonts.inter_regular,
        fontSize: moderateScale(16),
        lineHeight: moderateScale(22),
        color: colors.light_200,
        textDecorationLine: "none"
    },
    title: {
        fontFamily: fonts.inter_regular,
        fontSize: moderateScale(15),
        color: colors.light_100
    },
    dualContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: moderateScale(6),
        padding: moderateScale(5),
        borderRadius: moderateScale(8),
        backgroundColor: colors.dark_200
    },
    dualButton: {
        borderRadius: moderateScale(5),
        alignItems: 'center',
        paddingHorizontal: moderateScale(8),
        paddingVertical: moderateScale(6),
        backgroundColor: colors.primary
    },
    inputContainer: {
        backgroundColor: colors.dark_100,
        paddingHorizontal: moderateScale(14),
        paddingVertical: moderateScale(22),
        borderRadius: moderateScale(6),
        gap: moderateScale(6),
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    }
});