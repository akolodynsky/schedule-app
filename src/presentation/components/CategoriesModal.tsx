import React, {memo} from 'react';
import {TouchableOpacity} from 'react-native';
import {router} from "expo-router";
import {useShallow} from "zustand/react/shallow";

import CustomModal from "@/src/presentation/components/ui/CustomModal";
import CategoryCard from "@/src/presentation/components/CategoryCard";
import {useCategoryStore, useEventStore} from "../stores";


const CategoriesModal = memo(({onClose}: {onClose: () => void}) => {
    const setCategory = useEventStore(useShallow(state => state.setCategory));

    const categories = useCategoryStore(useShallow(state =>  state.categories));

    const selectCategory = (category: ICategory) => {
        setCategory(category);
        onClose();
    }

    return (
        <CustomModal title="CategoryPage" button={() => router.push("/category")}>
            {categories.map((category) => (
                <TouchableOpacity className="self-start" key={category.id} onPress={() => selectCategory(category)}>
                    <CategoryCard category={category} />
                </TouchableOpacity>
            ))}
        </CustomModal>
    );
});

export default CategoriesModal;
