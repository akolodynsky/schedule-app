import React, {useRef} from 'react';
import {View, Text} from 'react-native';

import {WarnModal} from "@/src/presentation/components/ui/WarnModal";
import AnimatedComponent, {AnimatedComponentRef} from "@/src/presentation/components/ui/AnimatedComponent";
import {SettingModal, SettingInput, SettingCheck, SettingDual} from "@/src/presentation/components/SettingInputs";

type block= {type: string, settings: setting[]};
type setting = {type: string, title: string, options?: string[]};

const blocks: block[] = [
    {
        type: "System settings",
        settings: [
            {type: "modal", title: "Language", options: ["English"]},
            {type: "dual", title: "Theme", options: ["Dark", "Light"]},
            {type: "check", title: "Enable Notifications"}]
    },
    {
        type: "Calendar settings",
        settings: [
            {type: "dual", title: "Time Format", options: ["12", "24"]},
            {type: "modal", title: "Start Of The Week", options: ["Monday", "Sunday", "Saturday"]}]
    },
    {
        type: "Clear settings",
        settings: [
            {type: "button", title: "Reset All Settings"},
            {type: "button", title: "Clear database"}]
    },
]


const SettingsList = () => {
    const warnModalRef = useRef<AnimatedComponentRef>(null);

    return (
        <>
            <AnimatedComponent ref={warnModalRef} modalStyle="justify-center items-center">
                <WarnModal
                    title={"Database Reset Warning!"}
                    text={"You are about to permanently delete all saved data, including your events, tasks, and categories. This action cannot be undone."}
                    buttonText={"Delete"}
                    onSubmit={() => console.log("ok")}
                    onClose={() => warnModalRef.current?.close()}
                />
            </AnimatedComponent>

            <View className="bg-dark-100 flex-1">
                <View className="flex-1 pt-10 px-8 gap-5 bg-dark-200 rounded-tr-[76px]">
                    {blocks.map((block) => (
                        <View>
                            <Text className="font-inter_semibold text-light-300 text-[13px] ml-6 mb-3 z-10">{block.type}</Text>
                            <View key={block.type} className="gap-3">
                                {block.settings.map((setting) => (
                                    setting.type === "modal" && setting.options
                                        ? <SettingModal key={setting.title} title={setting.title} options={setting.options} /> :
                                    setting.type === "dual" && setting.options
                                        ? <SettingDual key={setting.title} title={setting.title} options={setting.options} /> :
                                    setting.type === "check"
                                        ? <SettingCheck key={setting.title} title={setting.title} />
                                        : <SettingInput key={setting.title} title={setting.title} />
                                ))}
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        </>
    );
};

export default SettingsList;
