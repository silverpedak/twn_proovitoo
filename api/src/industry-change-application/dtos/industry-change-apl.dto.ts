import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import {
  Industry,
  IndustryChangeApplicationStatus,
  ObjectStatusIndustryChangeApp,
  RegulatoryElection,
} from 'src/common/constants/enums';

export class DecisionChangeIndustryDto {
  @IsOptional()
  @IsDate()
  decidedAt?: Date | null;

  @IsOptional()
  @IsString()
  decidedBy?: string | null;

  @IsOptional()
  @IsString()
  rejectionReason?: string | null;
}

export class RequestedIndustryDto {
  @IsBoolean()
  willWorkInPhysicalJurisdiction: boolean;

  @IsEnum(Industry)
  industry?: Industry;

  @IsEnum(RegulatoryElection)
  regulatoryElection?: RegulatoryElection;

  @IsString()
  regulatoryElectionSub?: string;
}

export class CurrentIndustryDto {
  @IsBoolean()
  willWorkInPhysicalJurisdiction: boolean;

  @IsEnum(Industry)
  industry?: Industry;

  @IsEnum(RegulatoryElection)
  regulatoryElection?: RegulatoryElection;

  @IsString()
  regulatoryElectionSub?: string;
}

export class IndustryChangeDto {
  @IsUUID(4)
  residentSub: string;

  @IsObject()
  current: CurrentIndustryDto;

  @IsObject()
  requested: RequestedIndustryDto;

  @IsEnum(IndustryChangeApplicationStatus)
  status: IndustryChangeApplicationStatus;

  @IsOptional()
  @IsDate()
  submittedAt?: Date;

  @IsOptional()
  @IsObject()
  decision?: DecisionChangeIndustryDto;

  @IsEnum(ObjectStatusIndustryChangeApp)
  objectStatus: ObjectStatusIndustryChangeApp;
}
