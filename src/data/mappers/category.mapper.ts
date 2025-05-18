import {Category} from "@/src/domain/entities";
import {TaskWithCategoryDto} from "@/src/data/dto/TaskDto";

export const mapCategoryDtoToCategory = (dto: TaskWithCategoryDto) => {
    return new Category({
        id: dto.category_id!,
        name: dto.category_name!,
        color: dto.category_color!,
    })
};