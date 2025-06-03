import React, {memo} from 'react';
import {TouchableOpacity} from 'react-native';
import {router} from "expo-router";
import {useShallow} from "zustand/react/shallow";

import { CustomModal } from "./ui";
import CategoryCard from "./CategoryCard";

import { useCategoryStore, useEventStore } from "../stores";


const CategoriesModal = memo(({onClose}: {onClose: () => void}) => {
    const setCategory = useEventStore(useShallow(state => state.setCategory));

    const categories = useCategoryStore(useShallow(state =>  state.categories));

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
                <TouchableOpacity className="self-start" key={category.id} onPress={() => selectCategory(category)}>
                    <CategoryCard category={category} />
                </TouchableOpacity>
            ))}
        </CustomModal>
    );
});

export default CategoriesModal;
