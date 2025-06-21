import React, { memo } from 'react';
import { TouchableOpacity } from 'react-native';
import { router } from "expo-router";

import { CustomModal } from "./ui";
import CategoryCard from "./CategoryCard";

import { useCategoryStore, useEventStore } from "../stores";


const CategoriesModal = ({ onClose }: { onClose: () => void }) => {
    const setCategory = useEventStore(s => s.setCategory);
    const categories = useCategoryStore(s =>  s.categories);

    const selectCategory = (category: ICategory) => {
        setCategory(category);
        onClose();
    }

    const createCategory = () => {
        router.push("/category")
        onClose();
    }

    return (
        <CustomModal title="Category" button={createCategory}>
            {categories.map((category) => (
                <TouchableOpacity style={{ alignSelf: 'flex-start' }} key={category.id} onPress={() => selectCategory(category)}>
                    <CategoryCard category={category} />
                </TouchableOpacity>
            ))}
        </CustomModal>
    );
};

export default memo(CategoriesModal);
