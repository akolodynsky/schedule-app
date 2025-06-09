import React, { memo } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { icons } from "@/src/shared/constants";


const CategoryCard = ({ category, remove }: { category: ICategory, remove?: () => void }) => {
    return (
        <View className="self-start rounded-xl px-4 py-2 flex-row items-center" style={{ backgroundColor: category.color }}>
            <Text className="font-inter_semibold text-light-100 text-[16px]">{category.name}</Text>
            {remove && (
                <TouchableOpacity onPress={remove}>
                    <Image source={icons.del} className="size-8 ml-1 mt-0.5" />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default memo(CategoryCard);


export const DefaultCard = () => {
    return (
        <View className="self-start rounded-xl px-4 py-2 flex-row items-center bg-primary">
            <Text className="font-inter_semibold text-light-100 text-[16px]">Main Tasks</Text>
        </View>
    );
};
