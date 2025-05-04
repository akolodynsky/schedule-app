import React from 'react';
import {Pressable, View} from 'react-native';
import {useRouter} from "expo-router";
import {useShallow} from "zustand/react/shallow";

import CategoryCard from "./CategoryCard";
import {useCategoryStore} from "../stores";
import {removeCategory, loadCategories} from "@/src/presentation/services/categoryActions";


const CategoriesList = () => {
    const { categories, setSelectedCategory, setName, setColor } = useCategoryStore(
        useShallow((state) => ({
            categories: state.categories,
            setSelectedCategory: state.setSelectedCategory,
            setName: state.setName,
            setColor: state.setColor,
        }))
    );

    const handleRemove = async (id: string) => {
        await removeCategory(id);
        await loadCategories();
    };

    const router = useRouter();

    const handleUpdate = (category: ICategory) => {
        setSelectedCategory(category);
        setName(category.name);
        setColor(category.color);
        router.push("/category");
    };

    return (
        <View className="bg-dark-100 flex-1">
            <View className="flex-1 pt-10 px-8 gap-5 bg-dark-200 rounded-tr-[76px]">
                {categories.map((category) => (
                    <Pressable key={category.id} className="self-start" onPress={() => handleUpdate(category)}>
                        <CategoryCard category={category} remove={() => handleRemove(category.id)} />
                    </Pressable>
                ))}
            </View>
        </View>
    );
};

export default CategoriesList;
