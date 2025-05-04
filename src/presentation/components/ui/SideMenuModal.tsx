import React, {useRef} from 'react';
import {Image, Pressable, View} from 'react-native';

import AnimatedComponent, {AnimatedComponentRef} from "@/src/presentation/components/ui/AnimatedComponent";
import SideMenu from "@/src/presentation/components/SideMenu";
import {icons} from "@/src/shared/constants/icons";


const SideMenuModal = () => {
    const modalRef = useRef<AnimatedComponentRef>(null);

    const handlePress = () => {
        modalRef.current?.open()
    }

    return (
        <>
            <Pressable className="absolute top-[58px] right-5 z-10" onPress={handlePress}>
                <Image source={icons.menu} className="size-6 mr-1.5" tintColor='#efeff9' />
            </Pressable>

            <View className="absolute">
                <AnimatedComponent ref={modalRef} horizontal contentStyle="items-end">
                    <SideMenu onClose={() => modalRef.current?.close()} />
                </AnimatedComponent>
            </View>
        </>

    );
};

export default SideMenuModal;
