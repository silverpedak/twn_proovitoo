import { IndustryChangeApplicationStatus } from 'src/common/constants/enums';

export const calculateApplicationStatus = (
  willWorkInPhysicalJurisdiction: boolean,
): IndustryChangeApplicationStatus => {
  return willWorkInPhysicalJurisdiction
    ? IndustryChangeApplicationStatus.IN_REVIEW
    : IndustryChangeApplicationStatus.APPROVED;
};
