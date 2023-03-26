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

  // @IsNullIfFalse('willWorkInPhysicalJurisdiction')
  @ValidateIf((o) => o.willWorkInPhysicalJurisdiction)
  @IsEnum(Industry)
  industry?: Industry;

  // @IsNullIfFalse('willWorkInPhysicalJurisdiction')
  @ValidateIf((o) => o.willWorkInPhysicalJurisdiction)
  @IsEnum(RegulatoryElection)
  regulatoryElection?: RegulatoryElection;

  // @IsNullIfFalse('willWorkInPhysicalJurisdiction')
  @ValidateIf((o) => o.willWorkInPhysicalJurisdiction)
  @IsString()
  regulatoryElectionSub?: string;
}
