import { Industry, RegulatoryElection } from '../constants/enums';

export interface CurrentIndustry {
  willWorkInPhysicalJurisdiction: boolean;
  industry?: Industry;
  regulatoryElection?: RegulatoryElection;
  regulatoryElectionSub?: string;
}
