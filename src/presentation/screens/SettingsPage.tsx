import React from 'react';
import {Text, View} from "react-native";
import {router} from "expo-router";

import PageRouteButtons from "@/src/presentation/components/ui/PageRouteButtons";
import PageHeader from "@/src/presentation/components/ui/PageHeader";
import SettingsList from "@/src/presentation/components/SettingsList";


export default function SettingsPage()  {

    return (
        <>
            <PageRouteButtons handleBack={() => router.back()} />

            <View className="bg-primary rounded-full absolute w-[50%] top-12 z-10 self-center">
                <Text className="font-inter_regular text-light-100 text-[15px] text-center">
                    This page only mock-up
                </Text>
            </View>

            <PageHeader name={"Settings"} />
            <SettingsList />
        </>
    );
};
