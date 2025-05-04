import React, {memo} from 'react';
import {Text, View} from 'react-native';

const PageHeader = ({ name }: {name: string}) => {
    return (
        <View className="rounded-bl-[76px] pt-16 bg-dark-100 pb-8">
            <View className="mt-8 w-full items-center">
                <Text className="text-light-100 font-inter_bold text-3xl">{name}</Text>
            </View>
        </View>
    );
};

export default memo(PageHeader);
