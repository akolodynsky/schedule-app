import React, {forwardRef, ReactNode, useImperativeHandle, useRef, useState} from 'react';
import {Animated, Modal, TouchableWithoutFeedback, View} from 'react-native';


export interface AnimatedComponentRef {
    open: () => void;
    close: () => void;
}

interface AnimatedComponentProps {
    children: ReactNode;
    modalStyle?: string;
    contentStyle?: string;
    horizontal?: boolean;
}

const AnimatedComponent = forwardRef<AnimatedComponentRef, AnimatedComponentProps>(({children, modalStyle, contentStyle, horizontal}, ref) => {
    const [showModal, setShowModal] = useState(false);

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
            setShowModal(true);
            setTimeout(() => {
                createParallel(1, 0, 100);
            }, 50);
        },
        close: () => {
            createParallel(0, 30, 100, true);
        },
    }));

    return (
        <>
            <Modal visible={showModal} statusBarTranslucent transparent animationType={"none"}>
                <View className={modalStyle} style={{flex: 1}}>
                    <TouchableWithoutFeedback onPress={() => ref && "current" in ref && ref?.current?.close()}>
                        <Animated.View className="absolute bottom-0 top-0 left-0 right-0 bg-black/50" style={{opacity: fadeAnim}} />
                    </TouchableWithoutFeedback>

                    <Animated.View className={contentStyle} style={{opacity: showModal ? fadeAnim : 0, transform: [horizontal ? {translateX} : {translateY}]}}>
                        {children}
                    </Animated.View>
                </View>
            </Modal>
        </>

    );
});

export default AnimatedComponent;
