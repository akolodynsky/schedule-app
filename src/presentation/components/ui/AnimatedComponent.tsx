import React, { forwardRef, ReactNode, useImperativeHandle, useRef, useState } from 'react';
import { Animated, Modal, TouchableWithoutFeedback, View, ViewStyle, StyleSheet } from 'react-native';


export interface AnimatedComponentRef {
    open: () => void;
    close: () => void;
}

interface AnimatedComponentProps {
    children: ReactNode;
    modalStyle?: ViewStyle;
    contentStyle?: ViewStyle;
    horizontal?: boolean;
}

export const AnimatedComponent = forwardRef<AnimatedComponentRef, AnimatedComponentProps>(
    ({ children, modalStyle, contentStyle, horizontal }, ref) => {

    const [showModal, setShowModal] = useState(false);
    const [contentReady, setContentReady] = useState(false);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(30)).current;
    const translateX = useRef(new Animated.Value(20)).current;

    const translateTo = horizontal ? translateX : translateY;

    const createParallel = (fade: number, translate: number, duration: number, close=false) => {
        Animated.parallel([
            Animated.timing(fadeAnim, { toValue: fade, duration: duration, useNativeDriver: true }),
            Animated.timing(translateTo, { toValue: translate, duration: duration, useNativeDriver: true }),
        ]).start(() => {
            if (close) setShowModal(false)
        });
    }

    useImperativeHandle(ref, () => ({
        open: () => {
            fadeAnim.setValue(0);
            translateTo.setValue(horizontal ? 20 : 30);

            setShowModal(true);

            setTimeout(() => {
                setContentReady(true);
                setTimeout(() => {
                    createParallel(1, 0, 75);
                }, 16);
            }, 40);
        },
        close: () => {
            createParallel(0, horizontal ? 20 : 30, 75, true);
        },
    }));

    if (!showModal) return null;

    return (
        <>
            <Modal
                visible={showModal}
                statusBarTranslucent
                transparent
                animationType="none"
                onShow={() => {
                    if (!contentReady) {
                        setTimeout(() => setContentReady(true), 16);
                    }
                }}
            >
                <View style={[{ flex: 1 }, modalStyle]}>
                    <TouchableWithoutFeedback onPress={() => (ref && typeof ref === 'object' && ref.current) && ref.current.close()}>
                        <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: "rgba(0, 0, 0, 0.5)", opacity: fadeAnim }]}/>
                    </TouchableWithoutFeedback>

                    {contentReady && (
                        <Animated.View style={[{opacity: fadeAnim, transform: [horizontal ? {translateX} : {translateY}]}, contentStyle]}>
                            {children}
                        </Animated.View>
                    )}
                </View>
            </Modal>
        </>

    );
});
