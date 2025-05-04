import React, {memo, useEffect, useRef} from 'react';
import {View} from 'react-native';
import {useShallow} from "zustand/react/shallow";

import CustomTextInput from "@/src/presentation/components/ui/CustomTextInput";
import DatePickerInput from "@/src/presentation/components/DatePickerInput";
import EventShortCard from "@/src/presentation/components/EventShortCard";
import ModalInput from "@/src/presentation/components/ui/ModalInput";
import ErrorModal from "@/src/presentation/components/ui/ErrorModal";
import EventsModal from "@/src/presentation/components/EventsModal";
import {useDateStore, useEventStore, useTaskStore} from "../stores";
import {loadEvents} from "../services/event";


const TaskForm = () => {
    const { name, setName, error, setError } = useTaskStore(
        useShallow((state) => ({
            name: state.name,
            setName: state.setName,
            error: state.error,
            setError: state.setError,
        }))
    );

    const { selectedEvent, setSelectedEvent } = useEventStore(
        useShallow(state => ({
            selectedEvent: state.selectedEvent,
            setSelectedEvent: state.setSelectedEvent,
        }))
    );

    const { date, setSelectedDate } = useDateStore(
        useShallow((state) => ({
            date: state.date,
            setSelectedDate: state.setSelectedDate,
        }))
    );

    const prevDateRef = useRef(date);

    useEffect(() => {
        void loadEvents(date)
        setSelectedDate(date)
        if (date !== prevDateRef.current) {
            setSelectedEvent(null)
        }
    }, [date]);

    return (
        <>
            <ErrorModal error={error} setError={setError} />

            <View className="bg-dark-100 flex-1">
                <View className="flex-1 pt-10 px-6 bg-dark-200 rounded-tr-[76px]">
                    <CustomTextInput title={"Name"} value={name} setValue={setName} />

                    <ModalInput
                        title="Events"
                        placeholder="Main Task"
                        renderContent={selectedEvent && (
                            <EventShortCard event={selectedEvent} remove={() => setSelectedEvent(null)} />
                        )}
                    >
                        {({onClose}) => <EventsModal onClose={onClose} />}
                    </ModalInput>

                    <DatePickerInput />

                </View>
            </View>
        </>

    );
};

export default memo(TaskForm);
