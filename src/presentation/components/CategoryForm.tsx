import React, { memo } from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import { moderateScale } from "react-native-size-matters";

import { CustomTextInput, ErrorModal, ModalInput } from "./ui";
import ColorsModal from "./ColorsModal";

import { useCategoryStore } from "../stores";
import { colors } from "@/src/shared/constants";



const CategoryForm = () => {
    return (
        <>
            <ErrorSection />

            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                overScrollMode="never"
            >
                <View style={{ flex: 0.7 }}>
                    <NameInput />
                </View>

                <View style={{ flex: 0.3 }}>
                    <ColorInput />
                </View>
            </ScrollView>
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



const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: moderateScale(22),
        backgroundColor: colors.dark_200
    },
    contentContainer: {
        flexDirection: 'row',
        columnGap: moderateScale(14),
        paddingTop: moderateScale(148),
        paddingBottom: moderateScale(30)
    },
});

