import React, {useRef} from 'react';
import {Pressable, ScrollView} from 'react-native';
import {useShallow} from "zustand/react/shallow";
import {router} from "expo-router";

import {removeCategory, loadCategories, updateCategoryState} from "@/src/presentation/services/category";
import {AnimatedComponentRef} from "@/src/presentation/components/ui/AnimatedComponent";
import {WarnModal} from "@/src/presentation/components/ui/WarnModal";
import {loadEvents} from "@/src/presentation/services/event";
import CategoryCard from "./CategoryCard";
import {useCategoryStore, useDateStore, useTaskStore} from "../stores";


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
                    <Pressable
                        key={category.id}
                        className="self-start max-w-[91%]"
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
            </ScrollView>
        </>
    );
};

export default CategoriesList;
