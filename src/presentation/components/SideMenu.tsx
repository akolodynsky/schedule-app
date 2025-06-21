import React from 'react';
import { Pressable, Text, View, Image, TouchableOpacity, ImageSourcePropType, StyleSheet } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import { runOnJS, useSharedValue } from "react-native-reanimated";
import { router } from "expo-router";
import { moderateScale, scale } from "react-native-size-matters";

import { colors, fonts, icons } from "@/src/shared/constants";


const sideMenuButtons = [
    { text: "Categories", icon: icons.categories, route: () => router.push("/categories") },
    { text: "Tasks", icon: icons.tasks, route: () => router.push("/tasks") },
    { text: "Settings", icon: icons.settings, route: () => router.push("/settings") },
];


const SideMenu = ({ onClose }: { onClose: () => void }) => {
    const translationX = useSharedValue(0);

    const panGesture = Gesture.Pan()
        .onUpdate((event) => {
            translationX.value = event.translationX;
        })
        .onEnd((event) => {
            if (event.translationX > 60) {
                runOnJS(onClose)();
            }
        });

    return (
        <View style={styles.container} collapsable={false}>
            <Pressable style={styles.backButtonContainer} onPress={onClose} />

            <GestureHandlerRootView style={styles.sideMenuContainer}>
                <GestureDetector gesture={panGesture}>
                    <View style={styles.contentContainer}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.title}>Menu</Text>

                            <TouchableOpacity onPress={onClose}>
                                <Image source={icons.plus} style={styles.backImage} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.buttonsContainer}>
                            {sideMenuButtons.map(({ text, icon, route }) => (
                                <SideMenuButton key={text} text={text} icon={icon} router={route} onClose={onClose} />
                            ))}
                        </View>
                    </View>
                </GestureDetector>
            </GestureHandlerRootView>
        </View>
    );
};

export default SideMenu;



interface SideMenuButtonProps {
    text: string,
    icon: ImageSourcePropType,
    router: () => void,
    onClose: () => void
}

const SideMenuButton = ({ text, icon, router, onClose }: SideMenuButtonProps) => {
    return (
        <TouchableOpacity
            onPress={() => {
                router();
                onClose();
            }}
            style={styles.buttonContainer}
        >
            <Image source={icon} style={styles.buttonImage} />
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    )
};



const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        height: '100%'
    },
    backButtonContainer: { flex: 1 },
    buttonsContainer: { gap: moderateScale(10) },
    sideMenuContainer: { flex: 1.6 },
    contentContainer: {
        height: '100%',
        paddingHorizontal: moderateScale(18),
        paddingVertical: moderateScale(50),
        backgroundColor: colors.dark_100,
        borderBottomLeftRadius: moderateScale(48),
        borderTopLeftRadius: moderateScale(48),
        gap: moderateScale(28)
    },
    headerContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    title: {
        fontFamily: fonts.inter_bold,
        fontSize: moderateScale(19),
        color: colors.light_100,
        letterSpacing: 1
    },
    backImage: {
        width: scale(24),
        height: scale(24),
        tintColor: colors.light_100,
        transform: [{ rotate: '45deg' }]
    },
    buttonContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: colors.dark_200,
        borderRadius: moderateScale(12),
        padding: moderateScale(13)
    },
    buttonText: {
        fontFamily: fonts.inter_medium,
        fontSize: moderateScale(15),
        color: colors.light_100
    },
    buttonImage: {
        width: scale(16),
        height: scale(16),
        marginRight: moderateScale(8)
    },
});