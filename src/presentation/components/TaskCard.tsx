import React, { memo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox/lib";

import { colors, fonts } from "@/src/shared/constants";
import {moderateScale} from "react-native-size-matters";


interface TaskCardProps {
    task: ITask;
    check: () => Promise<void>;
    longPress: () => void;
}

const TaskCard = memo(({ task, check, longPress }: TaskCardProps) => {
    const [checked, setChecked] = useState(task.isCompleted);

    const handleCheck = async () => {
        setChecked(!checked);

        setTimeout(() => {
            check();
        }, 300);
    };

    return (
        <View style={styles.container}>
            <BouncyCheckbox
                size={moderateScale(16)}
                fillColor={colors.primary}
                innerIconStyle={{ borderWidth: moderateScale(2) }}
                textStyle={styles.text}
                text={task.name}
                isChecked={checked}
                useBuiltInState={false}
                onPress={handleCheck}
                onLongPress={longPress}
                delayLongPress={300}
            />
        </View>
    );
});

export default TaskCard;



const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    text: {
        fontFamily: fonts.inter_medium,
        fontSize: moderateScale(15),
        lineHeight: moderateScale(20),
        color: colors.light_100
    }
});