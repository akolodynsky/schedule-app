import React, {ReactNode, useState} from 'react';
import {Image, Pressable, ScrollView, Text, TouchableOpacity, View} from 'react-native';

import {icons} from "@/src/shared/constants/icons";


interface CustomDropdownProps {
    options: string[];
}

const CustomModal = ({options}: CustomDropdownProps) => {
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(options[0]);

    const toggleMenu = () => setVisible(!visible);

    const handleSelect = (option: string) => {
        setSelected(option);
        setVisible(false);
    }

    return (
        <View>
            <TouchableOpacity onPress={toggleMenu} >
                <Text className="font-inter_regular text-light-300 text-lg self-end">{selected}</Text>
            </TouchableOpacity>


            {visible && (
                <View className="top-8 right-[-10px] bg-dark-200 rounded-lg absolute z-10 p-2 w-[120px] flex-wrap">
                    {options.map((option) => (
                        <TouchableOpacity key={option} onPress={() => handleSelect(option)} className="p-1">
                            <Text className="font-inter_regular text-light-100">{option}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>

    );
};

export default CustomModal;
