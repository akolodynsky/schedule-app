import React, {memo} from 'react';
import {View} from 'react-native';
import {useShallow} from "zustand/react/shallow";

import CustomTextInput from "@/src/presentation/components/ui/CustomTextInput";
import ErrorModal from "@/src/presentation/components/ui/ErrorModal";
import ModalInput from "@/src/presentation/components/ui/ModalInput";
import ColorsModal from "@/src/presentation/components/ColorsModal";
import {useCategoryStore} from "../stores";


const CategoryForm = () => {
    const { name, setName, color, error, setError } = useCategoryStore(
        useShallow((state) => ({
            name: state.name,
            setName: state.setName,
            color: state.color,
            error: state.error,
            setError: state.setError,
        }))
    );

    return (
        <>
            <ErrorModal error={error} setError={setError} />

            <View className="flex-1 pt-44 px-6 bg-dark-200">
                <CustomTextInput title={"Name"} value={name} setValue={setName} length={45} />

                <View className="flex-row gap-x-4">
                    <View className="flex-1">
                        <ModalInput
                            title="Color"
                            backgroundColor={color}
                        >
                            {({onClose}) => <ColorsModal onClose={onClose} />}
                        </ModalInput>
                    </View>

                    <View className="flex-1">
                        <ModalInput
                            title="Color"
                            backgroundColor={color}
                        >
                            {({onClose}) => <ColorsModal onClose={onClose} />}
                        </ModalInput>
                    </View>
                </View>

            </View>
        </>

    );
};

export default memo(CategoryForm);
