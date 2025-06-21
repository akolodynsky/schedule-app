import React, {useCallback} from 'react';
import { router } from "expo-router";
import { useFocusEffect } from "@react-navigation/core";
import { useShallow } from "zustand/react/shallow";

import { PageRouteButtons, PageHeader } from "../components/ui";
import CategoryForm from "../components/CategoryForm";

import { useCategoryStore } from "../stores";
import { createCategory, updateCategory } from "../services/category";


export default function CategoryCreate()   {
    const {reset, selectedCategory} = useCategoryStore(
        useShallow((state) => ({
            reset: state.reset,
            selectedCategory: state.selectedCategory,
        }))
    );

    const handleAddCategory = async () => {
        selectedCategory
            ? await updateCategory(selectedCategory.id)
            : await createCategory();
    };

    useFocusEffect(
        useCallback(() => {
            return () => {
                reset();
            };
        }, [])
    );

    return (
        <>
            <PageRouteButtons selected={selectedCategory && true} handleBack={() => router.back()} handleAdd={handleAddCategory}/>

            <PageHeader text={(selectedCategory ? "Update" : "Add") + " Category"} />
            <CategoryForm />
        </>
    );
};
