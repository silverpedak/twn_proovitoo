import {
  CurrentIndustry,
  DecisionIndustryChangeApl,
  RequestedIndustry,
} from '.';
import {
  IndustryChangeApplicationStatus,
  ObjectStatusIndustryChangeApp,
} from '../constants/enums';

export interface IndustryChangeApplication {
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
  objectStatus: ObjectStatusIndustryChangeApp;
}
