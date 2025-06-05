import { useEffect, useState } from "react";
import { SplashScreen } from "expo-router";

import { useDateStore } from "@/src/presentation/stores";
import { db, loadDefaultCategories } from "@/src/data/datasources";
import { loadCategories } from "@/src/presentation/services/category";
import { loadEvents } from "@/src/presentation/services/event";
import { loadTasks } from "@/src/presentation/services/task";


export const useAppLoading = () => {
    const [appLoaded, setAppLoaded] = useState(false);

    const selectedDate = useDateStore(state => state.selectedDate);

    useEffect(() => {
        async function prepare() {
            try {
                await SplashScreen.preventAutoHideAsync();

                await db();

                await loadDefaultCategories();

                await loadCategories();

                await loadEvents(selectedDate);

                await loadTasks();

                setTimeout(() => setAppLoaded(true), 150);
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