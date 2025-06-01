import React, {useRef} from 'react';
import {View, Text} from 'react-native';

import {WarnModal} from "@/src/presentation/components/ui/WarnModal";
import AnimatedComponent, {AnimatedComponentRef} from "@/src/presentation/components/ui/AnimatedComponent";
import {SettingModal, SettingInput, SettingCheck, SettingDual} from "@/src/presentation/components/SettingInputs";
import {clearAllTables} from "@/src/data/datasources/db";
import {blocks} from "@/src/shared/constants/settings";


const SettingsList = () => {
    const warnModalRef = useRef<AnimatedComponentRef>(null);

    const handleButtonPress = (title: string) => {
        switch (title) {
            case "Clear database":
                warnModalRef.current?.open();
                break;
        }
    };

    return (
        <>
            <AnimatedComponent ref={warnModalRef} modalStyle="justify-center items-center">
                <WarnModal
                    title={"Database Reset Warning!"}
                    text={"You are about to permanently delete all saved data, including your events, tasks, and categories. This action cannot be undone."}
                    buttonText={"Delete"}
                    onSubmit={() => clearAllTables()}
                    onClose={() => warnModalRef.current?.close()}
                />
            </AnimatedComponent>

            <View className="bg-dark-100 flex-1">
                <View className="flex-1 pt-10 px-8 gap-5 bg-dark-200 rounded-tr-[76px]">
                    {blocks.map((block) => (
                        <View key={block.type}>
                            <Text className="font-inter_semibold text-light-300 text-[13px] ml-6 mb-3 z-10">{block.type}</Text>
                            <View className="gap-3">
                                {block.settings.map((setting) => {
                                    switch (setting.type) {
                                        case "modal":
                                            return <SettingModal key={setting.title} title={setting.title} options={setting.options!} />
                                        case "dual":
                                            return <SettingDual key={setting.title} title={setting.title} options={setting.options!} />
                                        case "check":
                                            return <SettingCheck key={setting.title} title={setting.title} />;
                                        case "button":
                                            return <SettingInput key={setting.title} title={setting.title} press={() => handleButtonPress(setting.title)} />
                                        default:
                                            return null;
                                }})}
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        </>
    );
};

export default SettingsList;
