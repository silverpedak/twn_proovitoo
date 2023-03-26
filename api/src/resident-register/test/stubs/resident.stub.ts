import {
  ResidentStatus,
  TypeOfRegistration,
  Industry,
  RegulatoryElection,
} from 'src/common/constants/enums';
import { Resident } from 'src/common/interfaces';

export const residentStub = (params?: Partial<Resident>): Resident => {
  return {
    sub: '5a9a0497-348d-466b-b740-f1696f3ab377',
    firstName: 'John',
    lastName: 'Doe',
    fullName: 'John Doe',
    permitNumber: 123,
    dateOfBirth: new Date(1994, 8, 30),
    countryOfBirth: 'USA',
    email: 'john.doe@example.com',
    citizenship: 'USA',
    gender: 'male',
    address: {
      country: 'USA',
      city: 'Anytown',
      state: 'CA',
      streetAddress: '123 Main St',
      zipCode: '12345',
      isVerifiedAddress: true,
    },
    phoneNumber: '555-1234',
    typeOfRegistration: TypeOfRegistration.RESIDENCY,
    willWorkInPhysicalJurisdiction: true,
    firstRegistrationDate: new Date(2022, 1, 1),
    nextSubscriptionPaymentDate: new Date(2023, 1, 1),
    profilePicture: 'https://example.com/pic.jpg',
    status: ResidentStatus.ACTIVE,
    residencyEndDate: new Date(2024, 1, 1),
    industry: Industry.AGRICULTURAL,
    regulatoryElection: RegulatoryElection.AUSTRALIA,
    regulatoryElectionSub: 'regsub',
    ...params,
  };
};
