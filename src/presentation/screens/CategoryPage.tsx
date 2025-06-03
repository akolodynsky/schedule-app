import React from 'react';
import {router} from "expo-router";
import {useShallow} from "zustand/react/shallow";

import PageRouteButtons from "@/src/presentation/components/ui/PageRouteButtons";
import PageHeader from "@/src/presentation/components/ui/PageHeader";
import CategoriesList from "../components/CategoriesList";
import {useEventStore} from "@/src/presentation/stores";


export default function CategoryPage()  {
    const setCategory = useEventStore(useShallow(state => state.setCategory));

    const handleAddCategory = async () => {
        router.push('/category');
    };

    const handleBack = () => {
        setCategory(null);
        router.back();
    };

    return (
        <>
            <PageRouteButtons handleBack={handleBack} handleAdd={handleAddCategory} />

            <PageHeader name={"Categories"} />
            <CategoriesList />
        </>
    );
};
