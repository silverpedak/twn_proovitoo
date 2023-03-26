import { Resident } from 'src/common/interfaces';

import { CreateIndustryChangeDto } from '../dtos';
import { ApplicationMatchCurrentException } from '../exceptions';

export const isRequestedAppMatchingCurrent = (
  resident: Resident,
  requested: CreateIndustryChangeDto,
) => {
  if (
    resident.willWorkInPhysicalJurisdiction ===
      requested.willWorkInPhysicalJurisdiction &&
    resident.industry === requested.industry &&
    resident.regulatoryElection === requested.regulatoryElection &&
    resident.regulatoryElectionSub === requested.regulatoryElectionSub
  ) {
    throw new ApplicationMatchCurrentException();
  }
};
