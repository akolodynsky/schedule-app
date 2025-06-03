import { TaskDatasource, CategoryDatasource, RecurringDatasource, EventDatasource } from "@/src/data/datasources";
import { EventRepositoryImpl, RecurringRepositoryImpl, CategoryRepositoryImpl, TaskRepositoryImpl } from "@/src/data/repositories";
import { EventUseCases, CategoryUseCases, TaskUseCases } from "@/src/domain/usecases";


export const container = {
    eventUseCases: new EventUseCases(
        new EventRepositoryImpl(new EventDatasource()),
        new RecurringRepositoryImpl(new RecurringDatasource()),
    ),
    categoryUseCases: new CategoryUseCases(
        new CategoryRepositoryImpl(new CategoryDatasource()),
    ),
    taskUseCases: new TaskUseCases(
        new TaskRepositoryImpl(new TaskDatasource()),
    )
}
