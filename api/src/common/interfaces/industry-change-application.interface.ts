import {
  CurrentIndustry,
  DecisionIndustryChangeApl,
  RequestedIndustry,
} from '.';
import {
  IndustryChangeApplicationStatus,
  ObjectStatusIndChangeApl,
} from '../constants/enums';

export type IndustryChangeApplication = {
  _id: string;
  residentSub: string;
  current: CurrentIndustry;
  requested: RequestedIndustry;
  status: IndustryChangeApplicationStatus;
  submittedAt?: Date;
  decision?: DecisionIndustryChangeApl;
  createdAt: Date;
  createdBy?: string;
  updatedAt: Date;
  updatedBy?: string;
  objectStatus: ObjectStatusIndChangeApl;
};
