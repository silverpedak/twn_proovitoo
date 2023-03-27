import {
  IndustryChangeApplicationStatus,
  ObjectStatusIndustryChangeApp,
} from 'src/common/constants/enums';
import { Resident } from 'src/common/interfaces';
import { CreateIndustryChangeDto } from '../dtos';
import { IndustryChangeApplication } from '../schemas';

export const createNewIndustryChangeApplication = (
  resident: Resident,
  requestedApplication: CreateIndustryChangeDto,
  status: IndustryChangeApplicationStatus,
): IndustryChangeApplication => {
  const currentDateTime = new Date();

  const newApplication: IndustryChangeApplication = {
    residentSub: resident.sub,
    current: {
      willWorkInPhysicalJurisdiction: resident.willWorkInPhysicalJurisdiction,
      industry: resident.industry,
      regulatoryElection: resident.regulatoryElection,
      regulatoryElectionSub: resident.regulatoryElectionSub,
    },
    requested: requestedApplication,
    status: status,
    submittedAt: currentDateTime,
    decision: {
      decidedAt:
        status === IndustryChangeApplicationStatus.APPROVED
          ? currentDateTime
          : null,
      decidedBy:
        status === IndustryChangeApplicationStatus.APPROVED
          ? 'Automatic'
          : null,
      rejectionReason: null,
    },
    createdAt: currentDateTime,
    createdBy: 'user id from JWT',
    updatedAt: currentDateTime,
    updatedBy: 'user id from JWT',
    objectStatus: ObjectStatusIndustryChangeApp.CURRENT,
  };
  return newApplication;
};
