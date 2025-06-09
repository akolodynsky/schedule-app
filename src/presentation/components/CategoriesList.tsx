import React, { memo, useRef } from 'react';
import { Pressable, ScrollView } from 'react-native';
import { router } from "expo-router";

import { AnimatedComponentRef, WarnModal } from "./ui";
import CategoryCard from "./CategoryCard";

import { useCategoryStore, useDateStore, useTaskStore } from "../stores";
import { removeCategory, updateCategoryState } from "../services/category";
import { loadEvents } from "../services/event";


const CategoriesList = () => {
    const categories = useCategoryStore((s => s.categories));
    const selectedDate = useDateStore((s => s.selectedDate));
    const setShouldReloadTasks = useTaskStore((s => s.setShouldReloadTasks));

    const warnModalRef = useRef<AnimatedComponentRef>(null);
    const categoryIdRef = useRef<string | null>(null);

    const handleRemove = async () => {
        if (!categoryIdRef.current) return;

        await removeCategory(categoryIdRef.current);
        await loadEvents(selectedDate);
        setShouldReloadTasks(true);
        categoryIdRef.current = null;
    };

    return (
        <>
            <WarnModal
                ref={warnModalRef}
                title={"Deletion Warning!"}
                text={"You are about to delete this category. All events and tasks associated with it will also be deleted."}
                buttonText={"Delete"}
                onSubmit={() => handleRemove()}
                onClose={() => warnModalRef.current?.close()}
            />

            <ScrollView
                className="flex-1 px-6 bg-dark-200"
                contentContainerStyle={{ paddingBottom: 40, paddingTop: 160, gap: 20 }}
                overScrollMode="never"
            >
                {categories.map((category) => (
                    <CategoriesListItem
                        key={category.id}
                        category={category}
                        onRemove={() => {
                            categoryIdRef.current = category.id;
                            warnModalRef.current?.open()
                        }}
                    />
                ))}
            </ScrollView>
        </>
    );
};

export default memo(CategoriesList);


const CategoriesListItem = memo(({ category, onRemove }: { category: ICategory; onRemove: () => void }) => (
    <Pressable
        key={category.id}
        className="self-start max-w-[91%]"
        onPress={() => {
            updateCategoryState(category);
            router.push("/category");
        }}
    >
        <CategoryCard category={category} remove={onRemove} />
    </Pressable>
));
