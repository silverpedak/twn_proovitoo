import { Industry, RegulatoryElection } from '../constants/enums';

export interface RequestedIndustry {
  willWorkInPhysicalJurisdiction: boolean;
  industry?: Industry;
  regulatoryElection?: RegulatoryElection;
  regulatoryElectionSub?: string;
}
