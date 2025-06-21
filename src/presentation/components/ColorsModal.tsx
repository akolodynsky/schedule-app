import React, { memo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { moderateScale } from "react-native-size-matters";

import { CustomModal } from "./ui";

import { useCategoryStore } from "../stores";
import { categoryColors } from "@/src/shared/constants";


const ColorsModal = memo(({ onClose }: { onClose: () => void }) => {
    const setColor = useCategoryStore(s => s.setColor);

    const selectColor = (shade: string) => {
        setColor(shade);
        onClose();
    };

    return (
        <CustomModal title="Colors">
            {categoryColors.map((color) => (

                <View key={color.name} style={styles.container}>
                    {color.shades.map((shade) => (
                        <TouchableOpacity key={shade} onPress={() => selectColor(shade)}>
                            <View style={[styles.button, { backgroundColor: shade }]} />
                        </TouchableOpacity>
                    ))}
                </View>

            ))}
        </CustomModal>
    );
});

export default ColorsModal;



const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: moderateScale(8)
    },
    button: {
        paddingHorizontal: moderateScale(26),
        paddingVertical: moderateScale(26),
        borderRadius: 9999
    }
});
