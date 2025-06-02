import React, {useRef} from 'react';
import {Pressable, ScrollView, View} from 'react-native';
import {useShallow} from "zustand/react/shallow";

import CategoryCard from "./CategoryCard";
import {useCategoryStore, useDateStore, useTaskStore} from "../stores";
import {removeCategory, loadCategories, updateCategoryState} from "@/src/presentation/services/category";
import {router} from "expo-router";
import {WarnModal} from "@/src/presentation/components/ui/WarnModal";
import AnimatedComponent, {AnimatedComponentRef} from "@/src/presentation/components/ui/AnimatedComponent";
import {loadEvents} from "@/src/presentation/services/event";
import {clearAllTables} from "@/src/data/datasources/db";


const CategoriesList = () => {
    const categories = useCategoryStore(useShallow(state => state.categories));
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

    return (
        <>
            <WarnModal
                ref={warnModalRef}
                title={"Database Reset Warning!"}
                text={"You are about to permanently delete all saved data, including your events, tasks, and categories. This action cannot be undone."}
                buttonText={"Delete"}
                onSubmit={() => clearAllTables()}
                onClose={() => warnModalRef.current?.close()}
            />

            <View className="bg-dark-100 flex-1">
                <View className="flex-1 pt-10 px-8 gap-5 bg-dark-200 rounded-tr-[76px]">
                    {categories.map((category) => (
                        <Pressable
                            key={category.id}
                            className="self-start"
                            onPress={() => {
                                updateCategoryState(category);
                                router.push("/category");
                            }}
                        >
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
