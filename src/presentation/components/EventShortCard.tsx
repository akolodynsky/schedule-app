import React from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { moderateScale, scale } from "react-native-size-matters";

import CategoryCard from "./CategoryCard";

import { getDuration } from "@/src/shared/utils";
import { colors, fonts, icons } from "@/src/shared/constants";


const EventShortCard = ({ event, remove }: { event: IEvent, remove?: () => void }) => {

    return (
        <View style={[styles.container, remove ? styles.bigContainer : styles.shortContainer]}>
            <View style={styles.headerContainer}>
                <View style={styles.leftContainer}>
                    <Text style={[styles.topText, { fontSize: 12 }]}>{event.start} - {event.end}</Text>

                    <Text style={[styles.topText, { fontSize: 11 }]}>({getDuration(event.start, event.end)})</Text>
                </View>

                <View style={styles.rightContainer}>
                    {event.tasksCount > 0 &&
                        <Text style={[styles.topText, { fontSize: 12 }]}>
                            {event.tasksCount} Task{event.tasksCount > 1 && 's'}
                        </Text>
                    }

                    {remove && (
                        <TouchableOpacity onPress={remove}>
                            <Image source={icons.del} style={styles.buttonImage} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            <View style={styles.contentContainer}>
                <View style={styles.categoryContainer}>
                    <CategoryCard category={event.category} />
                </View>

                {event.name && <Text style={styles.nameText} numberOfLines={1}>{event.name}</Text>}
            </View>
        </View>
    );
};

export default EventShortCard;



const styles = StyleSheet.create({
    container: {
        width: '100%',
        gap: moderateScale(10),
        borderRadius: moderateScale(16),
        borderWidth: moderateScale(2),
        paddingHorizontal: moderateScale(9),
        paddingTop: moderateScale(8)
    },
    bigContainer: { paddingBottom: moderateScale(16), borderColor: colors.dark_200 },
    shortContainer: { padding: moderateScale(12), borderColor: colors.light_300 },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leftContainer: { flexDirection: 'row', gap: moderateScale(4) },
    topText: { color: colors.light_300, fontFamily: fonts.inter_medium },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(12)
    },
    buttonImage: {
        width: scale(22),
        height: scale(22),
        tintColor: colors.light_300
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: moderateScale(6)
    },
    categoryContainer: { marginLeft: moderateScale(-1) },
    nameText: {
        color: colors.light_100,
        fontFamily: fonts.inter_bold,
        fontSize: moderateScale(15)
    }
});