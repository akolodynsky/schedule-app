import React, { memo } from 'react';
import { View } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { CustomTextInput, ErrorModal, ModalInput } from "./ui";
import RepeatEventInput from "./RepeatEventInput";
import CategoriesModal from "./CategoriesModal";
import DateTimeInput from "./DateTimeInput";
import CategoryCard from "./CategoryCard";
import TasksInput from "./TasksInput";

import { useEventStore } from "../stores";


const EventForm = () => {
    return (
        <>
            <ErrorSection />

            <KeyboardAwareScrollView
                className="px-6 bg-dark-200"
                contentContainerStyle={{ paddingTop: 150 }}
                enableOnAndroid
                overScrollMode="never"
                keyboardShouldPersistTaps="handled"
            >
                <CategorySection />

                <NameInput />

                <DescriptionInput />

                <TasksInput />

                <RepeatEventInput />

                <DateTimeInput />
            </KeyboardAwareScrollView>
        </>
    );
};

export default memo(EventForm);



const ErrorSection = () => {
    const error = useEventStore((s) => s.error);
    const setError = useEventStore((s) => s.setError);

    return <ErrorModal error={error} setError={setError} />;
};


const NameInput = () => {
    const name = useEventStore((s) => s.name);
    const setName = useEventStore((s) => s.setName);

    return <CustomTextInput title="Name" value={name} setValue={setName} length={90} />;
};


const DescriptionInput = () => {
    const description = useEventStore((s) => s.description);
    const setDescription = useEventStore((s) => s.setDescription);

    return <CustomTextInput title={"Description"} value={description} setValue={setDescription} length={450} />;
};


const CategorySection = () => {
    const category = useEventStore((s) => s.category);
    const setCategory = useEventStore((s) => s.setCategory);

    return (
        <ModalInput
            title="Category"
            placeholder="Select a category"
            renderContent={category && (
                <View className="max-w-[90%]">
                    <CategoryCard category={category} remove={() => {setCategory(null)}} />
                </View>
            )}
        >
            {({onClose}) => <CategoriesModal onClose={ onClose } />}
        </ModalInput>
    )
};
