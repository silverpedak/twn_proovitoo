import {
  Industry,
  RegulatoryElection,
  ResidentStatus,
  TypeOfRegistration,
  TypeOfRegistrationSub,
} from "../constants";
import { Address } from "./address.interface";

export interface Resident {
  sub: string;
  firstName: string;
  lastName: string;
  fullName: string;
  permitNumber: number;
  permitNumberQrCode?: string;
  dateOfBirth: Date;
  countryOfBirth: string;
  email: string;
  citizenship: string;
  gender: string;
  address: Address;
  phoneNumber: string;
  typeOfRegistration: TypeOfRegistration;
  typeOfRegistrationSub?: TypeOfRegistrationSub;
  industry?: Industry;
  willWorkInPhysicalJurisdiction: boolean;
  regulatoryElection?: RegulatoryElection;
  regulatoryElectionSub?: string;
  firstRegistrationDate: Date;
  nextSubscriptionPaymentDate: Date;
  profilePicture: string;
  status: ResidentStatus;
  residencyEndDate?: Date;
}
