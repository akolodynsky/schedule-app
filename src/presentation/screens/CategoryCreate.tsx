import React from 'react';
import {View} from "react-native";
import {router} from "expo-router";
import {useShallow} from "zustand/react/shallow";

import PageRouteButtons from "@/src/presentation/components/ui/PageRouteButtons";
import PageHeader from "@/src/presentation/components/ui/PageHeader";
import CategoryForm from "../components/CategoryForm";
import {useCategoryStore} from "../stores";
import {createCategory, updateCategory} from "@/src/presentation/services/category";


export default function CategoryCreate()   {
    const {reset, selectedCategory} = useCategoryStore(
        useShallow((state) => ({
            reset: state.reset,
            selectedCategory: state.selectedCategory,
        }))
    );

    const handleAddCategory = async () => {
        if (selectedCategory) {
            await updateCategory(selectedCategory.id, handleBack);
        } else {
            await createCategory(handleBack);
        }

    };

    const handleBack = () => {
        router.back();
        reset();
    };

    return (
        <>
            <PageRouteButtons
                selected={selectedCategory && true}
                handleBack={handleBack}
                handleAdd={handleAddCategory}
            />

            <View className="flex-1 bg-dark-200">
                <PageHeader name={(selectedCategory ? "Update" : "Add") + " Category"} />
                <CategoryForm />
            </View>
        </>
    );
};
