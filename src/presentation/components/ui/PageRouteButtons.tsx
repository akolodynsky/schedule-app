import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

import { icons } from "@/src/shared/constants";


interface PageRouteButtonsProps {
    handleAdd?: () => Promise<void> | void;
    handleBack?: () => void;
    handleRemove?: (() => void) | null;
    selected?: boolean | null;
}

export const PageRouteButtons = ({ handleAdd, handleBack, handleRemove, selected }: PageRouteButtonsProps) => {
    const icon = selected ? icons.ok : icons.add;

    return (
        <View className="absolute z-20 top-12 w-full px-6 flex-row justify-between items-center">
            <TouchableOpacity onPress={handleBack}>
                <Image source={icons.back} className="size-11" />
            </TouchableOpacity>

            <View className="flex-row gap-8">
                {(handleRemove && selected) && (
                    <TouchableOpacity onPress={handleRemove}>
                        <Image source={icons.trash} className={selected ? "size-8" : "size-11"} />
                    </TouchableOpacity>
                )}
                {handleAdd && (
                    <TouchableOpacity onPress={handleAdd}>
                        <Image source={icon} className={selected ? "size-8" : "size-11"} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};
