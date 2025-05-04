import React, {memo} from 'react';
import {View} from 'react-native';
import {useShallow} from "zustand/react/shallow";

import CustomTextInput from "@/src/presentation/components/ui/CustomTextInput";
import DateTimeInput from "@/src/presentation/components/DateTimeInput";
import TasksInput from "@/src/presentation/components/TasksInput";
import CategoriesModal from "@/src/presentation/components/CategoriesModal";
import ModalInput from "@/src/presentation/components/ui/ModalInput";
import CategoryCard from "@/src/presentation/components/CategoryCard";
import ErrorModal from "@/src/presentation/components/ui/ErrorModal";
import {useEventStore} from "../stores";
import RepeatEventInput from "@/src/presentation/components/RepeatEventInput";


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

            <View className="bg-dark-100 flex-1">
                <View className="flex-1 pt-10 px-6 bg-dark-200 rounded-tr-[76px]">
                    <ModalInput
                        title="Category"
                        renderContent={category && (
                            <View className="max-w-[95%]">
                                <CategoryCard category={category} remove={() => {setCategory(null)}} />
                            </View>
                        )}
                    >
                        {({onClose}) => <CategoriesModal onClose={onClose} />}
                    </ModalInput>

                    <CustomTextInput title={"Name"} value={name} setValue={setName} />

                    <CustomTextInput title={"Description"} value={description} setValue={setDescription} />

                    <TasksInput />

                    <RepeatEventInput />

                    <DateTimeInput />
                </View>
            </View>
        </>
    );
};

export default memo(EventForm);
