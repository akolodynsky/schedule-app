import { RecurringOptions } from "@/src/domain/entities";
import { RecurringDatasource } from "@/src/data/datasources";
import { RecurringRepository } from "@/src/domain/repositories";
import { mapRecurringDtoToRecurring, mapRecurringToRecurringDto } from "@/src/data/mappers";


export class RecurringRepositoryImpl implements RecurringRepository {
    constructor(
        private readonly datasource: RecurringDatasource
    ) {}

    async getAllByDate(date: string) {
        const dtos = await this.datasource.getRecurringOptionsByDate(date);
        return dtos.map(mapRecurringDtoToRecurring);
    };

    async getById(id: string) {
        const dto = await this.datasource.getRecurringOptionsById(id);
        return dto && mapRecurringDtoToRecurring(dto);
    };

    async insertOrEdit(recurring: RecurringOptions) {
        await this.datasource.insertOrEditRecurringOptions(mapRecurringToRecurringDto(recurring));
    };

    async delete(id: string) {
        await this.datasource.deleteRecurringOptions(id);
    }

    async getExceptDays(id: string) {
        const days = await this.datasource.getExceptDays(id);
        return days && days.except_days;
    }

    async insertExceptDate(id: string, exceptDate: string) {
        await this.datasource.insertDateToExceptDays(id, exceptDate);
    }
}