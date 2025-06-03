import React, { useCallback } from 'react';
import { router } from "expo-router";
import { useFocusEffect } from "@react-navigation/core";
import { useShallow } from "zustand/react/shallow";

import { PageRouteButtons, PageHeader } from "../components/ui";
import CategoriesList from "../components/CategoriesList";

import { useEventStore } from "../stores";


export default function CategoryPage()  {
    const setCategory = useEventStore(useShallow(state => state.setCategory));

    useFocusEffect(
        useCallback(() => {
            return () => {
                setCategory(null);
            };
        }, [])
    );

    return (
        <>
            <PageRouteButtons handleBack={() => router.back()} handleAdd={() => router.push('/category')} />

            <PageHeader name={"Categories"} />
            <CategoriesList />
        </>
    );
};
