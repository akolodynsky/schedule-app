import {mapRecurringDtoToRecurring, mapRecurringToRecurringDto} from "@/src/data/mappers/recurring.mapper";
import {RecurringRepository} from "@/src/domain/repositories/recurring.repository";
import {RecurringDatasource} from "@/src/data/datasources/recurring.datasource";
import {RecurringOptions} from "@/src/domain/entities";


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

    async insert(recurring: RecurringOptions) {
        await this.datasource.insertRecurringOptions(mapRecurringToRecurringDto(recurring));
    };

    async edit(recurring: RecurringOptions) {
        await this.datasource.editRecurringOptions(mapRecurringToRecurringDto(recurring));
    }

    async delete(id: string) {
        await this.datasource.deleteRecurringOptions(id);
    }
}