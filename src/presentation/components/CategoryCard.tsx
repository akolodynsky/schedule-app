import React, { memo } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale, scale } from "react-native-size-matters";

import { colors, fonts, icons } from "@/src/shared/constants";


const CategoryCard = ({ category, remove }: { category: ICategory, remove?: () => void }) => {
    return (
        <View style={[styles.container, { backgroundColor: category.color }]}>
            <Text style={styles.text}>{category.name}</Text>
            {remove && (
                <TouchableOpacity onPress={remove}>
                    <Image source={icons.del} style={styles.image} />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default memo(CategoryCard);


export const DefaultCard = () => {
    return (
        <View style={[styles.container, { backgroundColor: colors.primary }]}>
            <Text style={styles.text}>Main Tasks</Text>
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        alignSelf: 'flex-start',
        borderRadius: moderateScale(6),
        paddingHorizontal: moderateScale(12),
        paddingVertical: moderateScale(6),
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        fontFamily: fonts.inter_semibold,
        color: colors.light_100,
        fontSize: moderateScale(15)
    },
    image: {
        width: scale(22),
        height: scale(22),
        marginLeft: moderateScale(3),
        marginTop: moderateScale(2)
    }
});