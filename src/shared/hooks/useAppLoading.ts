import { useEffect, useState } from "react";
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

import { useDateStore } from "@/src/presentation/stores";
import { db, loadDefaultCategories } from "@/src/data/datasources";
import { loadCategories } from "@/src/presentation/services/category";
import { loadEvents } from "@/src/presentation/services/event";
import { loadTasks } from "@/src/presentation/services/task";
import { fonts } from "@/src/shared/constants";


export const useAppLoading = () => {
    const [appLoaded, setAppLoaded] = useState(false);

    const selectedDate = useDateStore(s => s.selectedDate);

    useEffect(() => {
        async function prepare() {
            try {
                await SplashScreen.preventAutoHideAsync();

                SplashScreen.setOptions({
                    duration: 300,
                    fade: true,
                });

                await Font.loadAsync({
                    [fonts.inter_regular]: require('../assets/fonts/Inter-Regular.ttf'),
                    [fonts.inter_medium]: require('../assets/fonts/Inter-Medium.ttf'),
                    [fonts.inter_semibold]: require('../assets/fonts/Inter-SemiBold.ttf'),
                    [fonts.inter_bold]: require('../assets/fonts/Inter-Bold.ttf')
                });

                await db();

                await loadDefaultCategories();

                await loadCategories();

                await loadEvents(selectedDate);

                await loadTasks();

                await new Promise(resolve => setTimeout(resolve, 250));
            } catch (e) {
                console.warn(e);
            } finally {
                setAppLoaded(true);
            }
        }

        void prepare();
    }, []);

    return appLoaded;
};