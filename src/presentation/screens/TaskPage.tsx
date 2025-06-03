import React from 'react';
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

            <PageHeader name={"Tasks"} />
            <TasksList />
        </>
    );
};
