import React, { useRef } from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

import { AnimatedComponentRef, WarnModal } from "./ui";
import { SettingModal, SettingInput, SettingCheck, SettingDual } from "./SettingInputs";

import { blocks, colors, fonts } from "@/src/shared/constants";
import { clearAllTables } from "@/src/data/datasources";
import {moderateScale} from "react-native-size-matters";


const SettingsList = () => {
    const warnModalRef = useRef<AnimatedComponentRef>(null);

    const handleButtonPress = (title: string) => {
        switch (title) {
            case "Clear database":
                warnModalRef.current?.open();
                break;
        }
    };

    return (
        <>
            <WarnModal
                ref={warnModalRef}
                title={"Database Reset Warning!"}
                text={"You are about to permanently delete all saved data, including your events, tasks, and categories. This action cannot be undone."}
                buttonText={"Delete"}
                onSubmit={() => clearAllTables()}
                onClose={() => warnModalRef.current?.close()}
            />

            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                overScrollMode="never"
            >
                {blocks.map((block) => (
                    <View key={block.type}>
                        <Text style={styles.title}>{block.type}</Text>
                        <View style={styles.inputsContainer}>
                            {block.settings.map((setting) => {
                                switch (setting.type) {
                                    case "modal":
                                        return <SettingModal key={setting.title} title={setting.title} options={setting.options!} />
                                    case "dual":
                                        return <SettingDual key={setting.title} title={setting.title} options={setting.options!} />
                                    case "check":
                                        return <SettingCheck key={setting.title} title={setting.title} />;
                                    case "button":
                                        return <SettingInput key={setting.title} title={setting.title} press={() => handleButtonPress(setting.title)} />
                                    default:
                                        return null;
                            }})}
                        </View>
                    </View>
                ))}
            </ScrollView>
        </>
    );
};

export default SettingsList;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: moderateScale(22),
        backgroundColor: colors.dark_200
    },
    contentContainer: {
        paddingBottom: moderateScale(30),
        paddingTop: moderateScale(148),
        gap: moderateScale(18)
    },
    inputsContainer: { gap: moderateScale(10) },
    title: {
        fontFamily: fonts.inter_semibold,
        fontSize: moderateScale(12),
        color: colors.light_300,
        marginLeft: moderateScale(20),
        marginBottom: moderateScale(10)
    }
});