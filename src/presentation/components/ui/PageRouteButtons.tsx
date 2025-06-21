import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

import { icons } from "@/src/shared/constants";

import { PageRouteButtonsStyles } from "./styles";


interface PageRouteButtonsProps {
    handleAdd?: () => Promise<void> | void;
    handleBack?: () => void;
    handleRemove?: (() => void) | null;
    selected?: boolean | null;
}

export const PageRouteButtons = ({ handleAdd, handleBack, handleRemove, selected }: PageRouteButtonsProps) => {
    const icon = selected ? icons.ok : icons.add;

    return (
        <View style={PageRouteButtonsStyles.container}>
            <TouchableOpacity onPress={handleBack}>
                <Image source={icons.back} style={PageRouteButtonsStyles.bigImage} />
            </TouchableOpacity>

            <View  style={PageRouteButtonsStyles.rightContainer}>
                {(handleRemove && selected) && (
                    <TouchableOpacity onPress={handleRemove}>
                        <Image source={icons.trash} style={selected ? PageRouteButtonsStyles.smallImage : PageRouteButtonsStyles.bigImage} />
                    </TouchableOpacity>
                )}
                {handleAdd && (
                    <TouchableOpacity onPress={handleAdd}>
                        <Image source={icon} style={selected ? PageRouteButtonsStyles.smallImage : PageRouteButtonsStyles.bigImage} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};