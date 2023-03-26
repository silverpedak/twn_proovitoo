import { IsMongoId, IsString } from 'class-validator';

export class GetIndustryChangeDto {
  @IsString()
  @IsMongoId()
  id: string;
}
