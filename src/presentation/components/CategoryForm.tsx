import React, { memo } from 'react';
import { View } from 'react-native';

import { CustomTextInput, ErrorModal, ModalInput } from "./ui";
import ColorsModal from "./ColorsModal";

import { useCategoryStore } from "../stores";


const CategoryForm = () => {
    return (
        <>
            <ErrorSection />

            <View className="flex-1 flex-row gap-x-4 pt-44 px-6 bg-dark-200">
                <View className="flex-[0.7]">
                    <NameInput />
                </View>

                <View className="flex-[0.3]">
                    <ColorInput />
                </View>
            </View>
        </>

    );
};

export default memo(CategoryForm);



const ErrorSection = () => {
    const error = useCategoryStore((s) => s.error);
    const setError = useCategoryStore((s) => s.setError);

    return <ErrorModal error={error} setError={setError} />;
};


const NameInput = () => {
    const name = useCategoryStore((s) => s.name);
    const setName = useCategoryStore((s) => s.setName);

    return <CustomTextInput title="Name" value={name} setValue={setName} length={45} />;
};


const ColorInput = () => {
    const color = useCategoryStore((s) => s.color);

    return (
        <ModalInput
            title="Color"
            backgroundColor={color}
        >
            {({onClose}) => <ColorsModal onClose={onClose} />}
        </ModalInput>
    );
};

