import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

import { IndustryChangeApplicationStatus } from 'src/common/constants/enums';

export class QueryIndustryChangeApplicationDto {
  @IsOptional()
  @IsEnum(IndustryChangeApplicationStatus, { each: true })
  statuses: IndustryChangeApplicationStatus[];

  @IsUUID(4)
  @IsNotEmpty()
  residentSub: string;
}
