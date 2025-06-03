import { container } from "@/src/shared/containers/container";
import { loadCategories } from "./loadCategories";


export const removeCategory = async (id: string) => {
    await container.categoryUseCases.deleteCategory(id);
    const eventIds = await container.eventUseCases.deleteEventsByCategoryId(id);

    for (const eventId of eventIds) {
        await container.taskUseCases.deleteTasksByEventId(eventId);
    }

    await loadCategories();
};