import {generateUniqueId, timeToNumber} from "../../shared/utils";
import { Event } from "@/src/domain/entities/Event";


export const addGaps = (events: Event[]): (Event | Gap)[] => {
    if (!events.length) return [{
        id: generateUniqueId("g"),
        start: "00:00",
        end: "24:00"
    }];

    const eventsWithGaps: (Event | Gap)[] = [];

    const addGap = (start: string, end: string) =>
        eventsWithGaps.push({
            id: generateUniqueId("g"),
            start: start,
            end: end
        });

    const firstEventStart = timeToNumber(events[0].start);

    if (firstEventStart > 0) {addGap("00:00", events[0].start)}

    events.forEach((currentEvent, i) => {
        if (i > 0) {
            const prevEventEnd = timeToNumber(events[i - 1].end);
            const currentStart = timeToNumber(currentEvent.start);
            if (currentStart > prevEventEnd) addGap(events[i - 1].end, currentEvent.start);
        }
        eventsWithGaps.push(currentEvent);
    })

    const lastEventEnd = events[events.length - 1].end;
    if (timeToNumber(lastEventEnd) < timeToNumber("24:00")) addGap(lastEventEnd, "24:00");

    return eventsWithGaps;
};