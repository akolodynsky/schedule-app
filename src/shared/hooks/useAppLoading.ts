import {useEffect, useState} from "react";
import {SplashScreen} from "expo-router";
import {db} from "@/src/data/datasources/db";
import * as SQLite from "expo-sqlite";
import {useDrizzleStudio} from "expo-drizzle-studio-plugin";

const database = SQLite.openDatabaseSync("santitime");

export const useAppLoading = () => {
    const [appLoaded, setAppLoaded] = useState(false);

    useDrizzleStudio(database);

    useEffect(() => {
        async function prepare() {
            try {
                await SplashScreen.preventAutoHideAsync();
                await new Promise((resolve) => setTimeout(resolve, 1000));
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
}