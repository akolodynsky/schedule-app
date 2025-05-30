import {TaskDatasource} from "@/src/data/datasources/task.datasource";
import {EventUseCases} from "@/src/domain/usecases/event.usecases";
import {EventRepositoryImpl} from "@/src/data/repositories/event.repository";
import {RecurringRepositoryImpl} from "@/src/data/repositories/recurring.repository";
import {CategoryUseCases} from "@/src/domain/usecases/category.usecases";
import {CategoryRepositoryImpl} from "@/src/data/repositories/category.repository";
import {TaskUseCases} from "@/src/domain/usecases/task.usecases";
import {TaskRepositoryImpl} from "@/src/data/repositories/task.repository";
import {EventDatasource} from "@/src/data/datasources/event.datasource";
import {RecurringDatasource} from "@/src/data/datasources/recurring.datasource";
import {CategoryDatasource} from "@/src/data/datasources/category.datasource";

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
