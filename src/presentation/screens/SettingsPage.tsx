import React from 'react';
import {ScrollView, Text, View} from "react-native";
import {router} from "expo-router";

import PageRouteButtons from "@/src/presentation/components/ui/PageRouteButtons";
import PageHeader from "@/src/presentation/components/ui/PageHeader";
import SettingsList from "@/src/presentation/components/SettingsList";


export default function SettingsPage()  {

    return (
        <>
            <PageRouteButtons handleBack={() => router.back()} />

            <View className="bg-primary rounded-xl absolute w-[50%] top-12 z-10">
                <Text className="font-inter_regular text-light-100 text-xl text-center">This page is still in development and currently not functional.</Text>
            </View>

            <ScrollView
                className="flex-1 bg-dark-200"
                contentContainerStyle={{ paddingBottom: 40 }}
                overScrollMode="never"
            >
                <PageHeader name={"Settings"} />
                <SettingsList />
            </ScrollView>
        </>
    );
};
