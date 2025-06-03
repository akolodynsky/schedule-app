import React from 'react';
import { router } from "expo-router";

import { PageRouteButtons, PageHeader } from "../components/ui";
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
