import React, {useRef} from 'react';
import {Pressable, View} from 'react-native';
import {useShallow} from "zustand/react/shallow";

import CategoryCard from "./CategoryCard";
import {useCategoryStore, useDateStore, useTaskStore} from "../stores";
import {removeCategory, loadCategories} from "@/src/presentation/services/categoryActions";
import {router} from "expo-router";
import {WarnModal} from "@/src/presentation/components/ui/WarnModal";
import AnimatedComponent, {AnimatedComponentRef} from "@/src/presentation/components/ui/AnimatedComponent";
import {loadEvents} from "@/src/presentation/services/event";


const CategoriesList = () => {
    const { categories, setSelectedCategory, setName, setColor } = useCategoryStore(
        useShallow((state) => ({
            categories: state.categories,
            setSelectedCategory: state.setSelectedCategory,
            setName: state.setName,
            setColor: state.setColor,
        }))
    );

    const selectedDate = useDateStore(useShallow(state => state.selectedDate));
    const setShouldReloadTasks = useTaskStore(useShallow(state => state.setShouldReloadTasks));

    const warnModalRef = useRef<AnimatedComponentRef>(null);
    const categoryIdRef = useRef<string | null>(null);

    const handleRemove = async () => {
        if (!categoryIdRef.current) return;

        await removeCategory(categoryIdRef.current);
        await loadEvents(selectedDate);
        setShouldReloadTasks(true);
        await loadCategories();
        categoryIdRef.current = null;
    };

    const handleUpdate = (category: ICategory) => {
        setSelectedCategory(category);
        setName(category.name);
        setColor(category.color);
        router.push("/category");
    };

    return (
        <>
            <AnimatedComponent ref={warnModalRef} modalStyle="justify-center items-center">
                <WarnModal
                    title={"Deletion Warning!"}
                    text={"You are about to delete a category. All events associated with this category, along with their tasks, will be permanently deleted."}
                    buttonText={"Delete"}
                    onSubmit={() => handleRemove()}
                    onClose={() => warnModalRef.current?.close()}
                />
            </AnimatedComponent>

            <View className="bg-dark-100 flex-1">
                <View className="flex-1 pt-10 px-8 gap-5 bg-dark-200 rounded-tr-[76px]">
                    {categories.map((category) => (
                        <Pressable key={category.id} className="self-start" onPress={() => handleUpdate(category)}>
                            <CategoryCard
                                category={category}
                                remove={() => {
                                    categoryIdRef.current = category.id;
                                    warnModalRef.current?.open()
                                }}
                            />
                        </Pressable>
                    ))}
                </View>
            </View>
        </>
    );
};

export default CategoriesList;
