import { StyleSheet } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

import { colors, fonts } from "@/src/shared/constants";


export const AddButtonStyles = StyleSheet.create({
    button: {
        position: 'absolute',
        bottom: moderateScale(30),
        right: moderateScale(30),
        zIndex: 10,
        backgroundColor: colors.primary,
        borderRadius: 9999,
        padding: moderateScale(10)
    },
    image: { width: scale(46), height: scale(46) },
});


export const CustomModalStyles = StyleSheet.create({
    container: {
        width: scale(250),
        maxHeight: verticalScale(550),
        paddingHorizontal: moderateScale(18),
        paddingVertical: moderateScale(30),
        backgroundColor: colors.dark_200,
        borderRadius: moderateScale(22)
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: moderateScale(30)
    },
    title: {
        fontFamily: fonts.inter_semibold,
        fontSize: moderateScale(20),
        color: colors.light_100
    },
    image: { width: scale(30), height: scale(30) }
});


export const CustomTextInputStyles = StyleSheet.create({
    title: {
        fontFamily: fonts.inter_medium,
        color: colors.light_200,
        marginBottom: moderateScale(10)
    },
    taskInput: {
        fontFamily: fonts.inter_regular,
        color: colors.light_100,
        fontSize: moderateScale(14),
        width: '85%'
    },
    input: {
        fontFamily: fonts.inter_regular,
        fontSize: moderateScale(14),
        color: colors.light_100,
        backgroundColor: colors.dark_100,
        borderRadius: moderateScale(6),
        paddingHorizontal: moderateScale(16),
        paddingVertical: moderateScale(20)
    }
});


export const DatePickerStyles = StyleSheet.create({
    container: {
        borderRadius: moderateScale(22),
        width: scale(300),
        height: verticalScale(350),
        paddingLeft: moderateScale(18),
        paddingRight: moderateScale(18),
        paddingTop: moderateScale(8)
    },
    header: {
        fontFamily: fonts.inter_medium,
        color: colors.light_100,
        fontSize: moderateScale(15)
    },
    button: {
        marginTop: moderateScale(-22),
        backgroundColor: colors.primary,
        paddingHorizontal: moderateScale(14),
        paddingVertical: moderateScale(8),
        borderBottomRightRadius: moderateScale(22),
        borderBottomLeftRadius: moderateScale(22)
    },
    buttonText: {
        fontFamily: fonts.inter_semibold,
        color: colors.light_100,
        textAlign: "center",
        fontSize: moderateScale(14)
    },
});


export const ErrorModalStyles = StyleSheet.create({
    modal: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: verticalScale(56),
        alignItems: 'center',
        zIndex: 50
    },
    container: {
        backgroundColor: colors.primary,
        paddingHorizontal: moderateScale(30),
        paddingVertical: moderateScale(14),
        borderRadius: 9999,
        elevation: 6
    },
    text: {
        fontFamily: fonts.inter_medium,
        color: colors.light_100,
        fontSize: moderateScale(18)
    },
});


export const ModalInputStyles = StyleSheet.create({
    title: {
        fontFamily: fonts.inter_medium,
        color: colors.light_200,
        marginBottom: moderateScale(10)
    },
    input: {
        paddingHorizontal: moderateScale(16),
        paddingVertical: moderateScale(20),
        borderRadius: moderateScale(6)
    },
    placeholder: {
        fontFamily: fonts.inter_regular,
        color: colors.light_300,
        fontSize: moderateScale(14)
    },
});


export const PageHeaderStyles = StyleSheet.create({
    container: {
        borderBottomLeftRadius: moderateScale(70),
        paddingTop: moderateScale(44),
        backgroundColor: colors.dark_100,
        paddingBottom: moderateScale(14),
        position: 'absolute',
        zIndex: 10,
        width: '100%'
    },
    textContainer: { marginTop: moderateScale(27), alignItems: 'center' },
    text: {
        fontFamily: fonts.inter_bold,
        color: colors.light_100,
        fontSize: moderateScale(24)
    },
    svgContainer: {
        position: 'absolute',
        top: verticalScale(103),
        right: 0,
        width: scale(58),
        height: scale(58),
        zIndex: 10
    },
});


export const PageRouteButtonsStyles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 20,
        top: verticalScale(38),
        width: '100%',
        paddingHorizontal: moderateScale(22),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    rightContainer: { flexDirection: 'row', gap: moderateScale(26) },
    smallImage: { width: scale(23), height: scale(23) },
    bigImage: { width: scale(35), height: scale(35) },
});


export const SideMenuModalStyles = StyleSheet.create({
    buttonContainer: {
        position: 'absolute',
        zIndex: 10,
        right: scale(24),
        top: verticalScale(53)
    },
    buttonImage: {
        width: scale(17),
        height: scale(17),
        tintColor: colors.light_100
    },
    container: { position: 'absolute' }
});


export const WarnMessageStyles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        borderRadius: 9999,
        position: 'absolute',
        width: '50%',
        top: verticalScale(40),
        zIndex: 20,
        alignSelf: 'center'
    },
    text: {
        fontFamily: fonts.inter_regular,
        color: colors.light_100,
        fontSize: moderateScale(14),
        textAlign: 'center'
    }
});


export const WarnModalStyles = StyleSheet.create({
    container: {
        backgroundColor: colors.dark_100,
        gap: moderateScale(28),
        paddingHorizontal: moderateScale(4),
        paddingVertical: moderateScale(32),
        borderRadius: moderateScale(22),
        alignItems: 'center',
        justifyContent: 'center'
    },
    contentContainer: {
        gap: moderateScale(12),
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontFamily: fonts.inter_bold,
        color: colors.light_100,
        fontSize: moderateScale(20)
    },
    image: { width: scale(70), height: scale(70) },
    textContainer: { width: "90%" },
    text: {
        fontFamily: fonts.inter_regular,
        color: colors.light_100,
        fontSize: moderateScale(14),
        textAlign: 'center'
    },
    buttonContainer: {
        gap: moderateScale(16),
        alignItems: 'center',
        flexDirection: 'row'
    },
    button: {
        backgroundColor: colors.primary,
        borderRadius: moderateScale(10),
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: moderateScale(20),
        paddingVertical: moderateScale(6)
    },
    buttonText: {
        fontFamily: fonts.inter_semibold,
        color: colors.light_100,
        fontSize: moderateScale(15)
    },
});