import {
  IndustryChangeApplicationStatus,
  ObjectStatusIndustryChangeApp,
} from 'src/common/constants/enums';
import { IndustryChangeApplication } from 'src/industry-change-application/schemas';

export const industryChangeApplicationStub = (
  params?: Partial<IndustryChangeApplication>,
): IndustryChangeApplication => {
  return {
    residentSub: 'test',
    current: {
      willWorkInPhysicalJurisdiction: false,
    },
    requested: {
      willWorkInPhysicalJurisdiction: true,
    },
    status: IndustryChangeApplicationStatus.IN_REVIEW,
    createdAt: new Date(),
    updatedAt: new Date(),
    objectStatus: ObjectStatusIndustryChangeApp.CURRENT,
    ...params,
  };
};
