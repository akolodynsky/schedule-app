import {EventRepositoryImpl} from "@/src/data/repositories/event.repository";
import {EventDatasource} from "@/src/data/datasources/event.datasource";
import {RecurringRepositoryImpl} from "@/src/data/repositories/recurring.repository";
import {RecurringDatasource} from "@/src/data/datasources/recurring.datasource";
import {EventUseCases} from "@/src/domain/usecases/event.usecases";
import {CategoryRepositoryImpl} from "@/src/data/repositories/category.repository";
import {CategoryUseCases} from "@/src/domain/usecases/category.usecases";
import {CategoryDatasource} from "@/src/data/datasources/category.datasource";

export const container = {
    eventUseCases: new EventUseCases(
        new EventRepositoryImpl(new EventDatasource()),
        new RecurringRepositoryImpl(new RecurringDatasource())
    ),

    categoryUseCases: new CategoryUseCases(
        new CategoryRepositoryImpl(new CategoryDatasource()),
    ),
}