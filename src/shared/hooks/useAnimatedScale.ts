import { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";


export const useAnimatedScale = () => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const handlePressIn = () => {
        scale.value = withSpring(0.97, { damping: 5, stiffness: 2000 });
    };

    const handlePressOut = () => {
        scale.value = withSpring(1, { damping: 5, stiffness: 2000 });
    };

    return { animatedStyle, handlePressIn, handlePressOut };
}