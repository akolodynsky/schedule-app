import React from 'react';
import { router } from "expo-router";

import { PageRouteButtons, PageHeader, WarnMessage } from "../components/ui";
import SettingsList from "../components/SettingsList";


export default function SettingsPage()  {

    return (
        <>
            <PageRouteButtons handleBack={() => router.back()} />

            <WarnMessage />

            <PageHeader text={"Settings"} />
            <SettingsList />
        </>
    );
};
