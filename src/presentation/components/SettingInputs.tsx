import React, {ReactNode, useRef, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox/lib";
import AnimatedComponent, {AnimatedComponentRef} from "@/src/presentation/components/ui/AnimatedComponent";
import CustomModal from "@/src/presentation/components/ui/CustomModal";


export const SettingModal = ({title, options}: { title: string, options: string[]}) => {
    const [selectedOption, setSelectedOption] = useState(options[0]);
    const modalRef = useRef<AnimatedComponentRef>(null);

    const selectOption = (option: string) => {
        setSelectedOption(option);
        modalRef.current?.close();
    };

    return (
        <>
            <AnimatedComponent ref={modalRef} modalStyle="justify-center items-center">
                <CustomModal title={title}>
                    {options.map((option) => (
                        <BouncyCheckbox
                            key={option}
                            size={17}
                            fillColor="#6f4bf7"
                            innerIconStyle={{ borderWidth: 2 }}
                            textStyle={{fontFamily: "Inter-Regular", fontSize: 17, lineHeight: 24, color: "#929298", textDecorationLine: "none"}}
                            text={option}
                            isChecked={option === selectedOption}
                            useBuiltInState={false}
                            onPress={() => selectOption(option)}
                        />
                    ))}
                </CustomModal>
            </AnimatedComponent>

            <SettingInput title={title} press={() => modalRef.current?.open()}>
                <Text className="font-inter_regular text-light-300 text-lg">
                    {selectedOption}
                </Text>
            </SettingInput>
        </>
    );
};


export const SettingCheck = ({title}: { title: string}) => {
    const [checked, setChecked] = useState(false);

    return (
        <SettingInput title={title} press={() => setChecked(!checked)}>
            <BouncyCheckbox
                size={20}
                fillColor="#6f4bf7"
                innerIconStyle={{ borderWidth: 2 }}
                isChecked={checked}
                useBuiltInState={false}
                onPress={() => setChecked(!checked)}
                disableText
            />
        </SettingInput>
    );
};


export const SettingDual = ({title, options}: { title: string, options: string[]}) => {
    const [selectedOption, setSelectedOption] = useState(options[0]);

    return (
        <SettingInput title={title} small>
            <View className="flex-row gap-2 justify-between bg-dark-200 rounded-xl p-2">
                {options.map(option => (
                    <Pressable key={option} onPress={() => setSelectedOption(option)}>
                        <View className={`rounded-lg px-2 py-1 items-center ${selectedOption === option ? "bg-primary" : "bg-dark-200"}`}>
                            <Text className={`font-inter_regular text-lg ${selectedOption === option ? "text-light-100" : "text-light-300"}`}>
                                {option}
                            </Text>
                        </View>
                    </Pressable>
                ))}
            </View>
        </SettingInput>
    );
};


export const SettingInput = ({title, children, press, small}: { title: string, children?: ReactNode, press?: () => void, small?: boolean}) => {
    const size = small ? "py-3" : "py-6";

    return (
        <Pressable onPress={press} className={`bg-dark-100 px-4 rounded-lg gap-2 justify-between flex-row items-center ${size}`}>
            <Text className="font-inter_regular text-light-100 text-lg">
                {title}
            </Text>

            {children}
        </Pressable>
    );
};
