import React, {memo} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useShallow} from "zustand/react/shallow";

import CustomModal from "@/src/presentation/components/ui/CustomModal";
import {useCategoryStore} from "../stores";
import {colors} from "@/src/shared/constants/colors";


const ColorsModal = memo(({onClose}: {onClose: () => void}) => {
    const setColor = useCategoryStore(
        useShallow(state => state.setColor)
    );

    const selectColor = (shade: string) => {
        setColor(shade);
        onClose();
    }

    return (
        <CustomModal title="Colors">
            {colors.map((color) => (

                <View key={color.name} className="flex-row justify-between px-2">
                    {color.shades.map((shade) => (
                        <TouchableOpacity key={shade} onPress={() => selectColor(shade)}>
                            <View style={{backgroundColor: shade}} className="py-7 px-7 rounded-full" />
                        </TouchableOpacity>
                    ))}
                </View>

            ))}
        </CustomModal>
    );
});

export default ColorsModal;
