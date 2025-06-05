import React, {memo} from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useShallow } from "zustand/react/shallow";

import { CustomTextInput, ModalInput, ErrorModal } from "./ui";
import RepeatEventInput from "./RepeatEventInput";
import CategoriesModal from "./CategoriesModal";
import DateTimeInput from "./DateTimeInput";
import CategoryCard from "./CategoryCard";
import TasksInput from "./TasksInput";

import { useEventStore } from "../stores";


const EventForm = () => {
    const { name, description, setName, setDescription, category, setCategory, error, setError } = useEventStore(
        useShallow((state) => ({
            name: state.name,
            description: state.description,
            setName: state.setName,
            setDescription: state.setDescription,
            category: state.category,
            setCategory: state.setCategory,
            error: state.error,
            setError: state.setError,
        }))
    );

    return (
        <>
            <ErrorModal error={error} setError={setError} />

            <KeyboardAwareScrollView
                className="px-6 bg-dark-200"
                contentContainerStyle={{ paddingTop: 150 }}
                enableOnAndroid
                overScrollMode="never"
                keyboardShouldPersistTaps="handled"
            >
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

                <CustomTextInput title={"Name"} value={name} setValue={setName} length={90} />

                <CustomTextInput title={"Description"} value={description} setValue={setDescription} length={450} />

                <TasksInput />

                <RepeatEventInput />

                <DateTimeInput />
            </KeyboardAwareScrollView>
        </>
    );
};

export default memo(EventForm);
