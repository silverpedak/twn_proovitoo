import { ResidentStatus, TypeOfRegistration } from 'src/common/constants/enums';
import { Resident } from 'src/common/interfaces';

import {
  ResidentInactiveException,
  ResidencyNotValidException,
} from '../exceptions';

export const validateResidency = (resident: Resident) => {
  if (resident.status === ResidentStatus.INACTIVE) {
    throw new ResidentInactiveException();
  }
  if (
    resident.typeOfRegistration !== TypeOfRegistration.E_RESIDENCY &&
    resident.typeOfRegistration !== TypeOfRegistration.RESIDENCY
  ) {
    throw new ResidencyNotValidException();
  }
};
