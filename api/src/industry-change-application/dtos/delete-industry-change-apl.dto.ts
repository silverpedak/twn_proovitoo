import { IsArray, IsMongoId } from 'class-validator';

export class DeleteIndustryChangeDto {
  @IsArray()
  @IsMongoId({ each: true })
  deleteIds: string[];
}
