import React from 'react';
import { Text, View } from "react-native";
import { router } from "expo-router";

import { PageRouteButtons, PageHeader } from "../components/ui";
import SettingsList from "../components/SettingsList";


export default function SettingsPage()  {

    return (
        <>
            <PageRouteButtons handleBack={() => router.back()} />

            <View className="bg-primary rounded-full absolute w-[50%] top-12 z-20 self-center">
                <Text className="font-inter_regular text-light-100 text-[15px] text-center">
                    This page only mock-up
                </Text>
            </View>

            <PageHeader name={"Settings"} />
            <SettingsList />
        </>
    );
};
