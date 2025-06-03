import React, { memo, useState } from 'react';
import { View } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox/lib";


const TaskCard = memo(({task, check, longPress}: { task: ITask, check: () => Promise<void>, longPress: () => void}) => {
    const [checked, setChecked] = useState(task.isCompleted);

    const handleCheck = async () => {
        setChecked(!checked);

        setTimeout(() => {
            check();
        }, 300);
    }

    return (
        <View className="flex-row items-start">
            <BouncyCheckbox
                size={16}
                fillColor="#6f4bf7"
                innerIconStyle={{ borderWidth: 2 }}
                textStyle={{fontFamily: "Inter-Medium", fontSize: 16, lineHeight: 22, color: "#efeff9"}}
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
