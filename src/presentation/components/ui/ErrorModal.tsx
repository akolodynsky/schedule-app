import React, { useEffect, useRef } from 'react';
import { Animated, Text, View } from 'react-native';

import { ErrorModalStyles } from "./styles";


interface ErrorModalProps {
    error: string;
    setError: (error: string) => void;
}

export const ErrorModal = ({ error, setError }: ErrorModalProps) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(-30)).current;

    useEffect(() => {
        if (error) {
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.spring(translateY, {
                    toValue: 0,
                    useNativeDriver: true,
                }),
            ]).start();

            const timer = setTimeout(() => {
                Animated.parallel([
                    Animated.timing(fadeAnim, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                    Animated.timing(translateY, {
                        toValue: -30,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                ]).start(() => {
                    requestAnimationFrame(() => setError(""));
                });
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [error]);

    if (!error) return null;

    return (
        <View pointerEvents="none" style={ErrorModalStyles.modal}>
            <Animated.View style={[ErrorModalStyles.container, { opacity: fadeAnim, transform: [{ translateY }]}]}>
                <Text style={ErrorModalStyles.text}>{error}</Text>
            </Animated.View>
        </View>
    );
};
