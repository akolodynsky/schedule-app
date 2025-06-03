import React from 'react';
import { router } from "expo-router";

import { PageRouteButtons, PageHeader } from "../components/ui";
import TasksList from "../components/TasksList";


export default function TaskPage()  {

    return (
        <>
            <PageRouteButtons
                handleBack={() => router.back()}
                handleAdd={() => router.push("/task")}
            />

            <PageHeader name={"Tasks"} />
            <TasksList />
        </>
    );
};
