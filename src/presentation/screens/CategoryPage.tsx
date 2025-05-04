import React from 'react';
import {ScrollView} from "react-native";
import {useRouter} from "expo-router";

import PageRouteButtons from "@/src/presentation/components/ui/PageRouteButtons";
import PageHeader from "@/src/presentation/components/ui/PageHeader";
import CategoriesList from "../components/CategoriesList";


export default function CategoryPage()  {
    const router = useRouter();

    const handleAddCategory = async () => {
        router.push('/category');
    };

    const handleBack = () => {
        router.back();
    };

    return (
        <>
            <PageRouteButtons handleBack={handleBack} handleAdd={handleAddCategory} />

            <ScrollView
                className="flex-1 bg-dark-200"
                contentContainerStyle={{ paddingBottom: 40 }}
                overScrollMode="never"
            >
                <PageHeader name={"Categories"} />
                <CategoriesList />
            </ScrollView>
        </>
    );
};
