import {useEffect, useState} from "react";
import {SplashScreen} from "expo-router";
import {db} from "@/src/data/datasources/db";


export const useAppLoading = () => {
    const [appLoaded, setAppLoaded] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                await SplashScreen.preventAutoHideAsync();

                await db();

                setAppLoaded(true);
            } catch (e) {
                console.warn(e);
            } finally {
                await SplashScreen.hideAsync();
            }
        }

        void prepare();
    }, []);

    return appLoaded;
};