import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { Industry, RegulatoryElection } from 'src/common/constants/enums';

export class CreateIndustryChangeDto {
  @IsUUID(4)
  residentSub: string;

  @IsBoolean()
  willWorkInPhysicalJurisdiction: boolean;

  @Transform(({ value, obj }: TransformFnParams) =>
    obj.willWorkInPhysicalJurisdiction ? value : null,
  )
  @Transform(({ value, obj }: TransformFnParams) =>
    obj.willWorkInPhysicalJurisdiction ? value : null,
  )
  @ValidateIf((o) => o.willWorkInPhysicalJurisdiction)
  @IsEnum(Industry)
  industry?: Industry;

  @Transform(({ value, obj }: TransformFnParams) =>
    obj.willWorkInPhysicalJurisdiction ? value : null,
  )
  @ValidateIf((o) => o.willWorkInPhysicalJurisdiction)
  @IsEnum(RegulatoryElection)
  regulatoryElection?: RegulatoryElection;

  @Transform(({ value, obj }: TransformFnParams) =>
    obj.willWorkInPhysicalJurisdiction ? value : null,
  )
  @ValidateIf((o) => o.willWorkInPhysicalJurisdiction)
  @IsString()
  regulatoryElectionSub?: string;
}
