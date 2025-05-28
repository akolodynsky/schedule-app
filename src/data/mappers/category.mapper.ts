import {Category} from "@/src/domain/entities";
import {CategoryFieldsDto} from "@/src/data/dto/CategoryDto";

export const mapCategoryDtoToCategory = (dto: CategoryFieldsDto) => {
    return new Category({
        id: dto.category_id,
        name: dto.category_name,
        color: dto.category_color,
    })
};