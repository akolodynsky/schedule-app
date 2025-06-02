import React from 'react';
import {View} from "react-native";
import {router} from "expo-router";

import PageRouteButtons from "@/src/presentation/components/ui/PageRouteButtons";
import PageHeader from "@/src/presentation/components/ui/PageHeader";
import TasksList from "../components/TasksList";



export default function TaskPage()  {
    const handleAddTask = () => {
        router.push("/task");
    };

    const handleBack = () => {
        router.back();
    };

    return (
        <>
            <PageRouteButtons handleBack={handleBack} handleAdd={handleAddTask} />

            <View className="flex-1 bg-dark-200">
                <PageHeader name={"Tasks"} />
                <TasksList />
            </View>

        </>
    );
};
