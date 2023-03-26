import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { FilterQuery } from 'mongoose';
import { ResidentStatus, TypeOfRegistration } from 'src/common/constants/enums';
import { ResidentRegisterService } from 'src/resident-register';
import { Resident } from 'src/resident-register/schemas';

@ValidatorConstraint({ async: true })
@Injectable()
export class ActiveResidencyConstraint implements ValidatorConstraintInterface {
  constructor(private readonly residentService: ResidentRegisterService) {}

  async validate(sub: string) {
    const query: FilterQuery<Resident> = {
      $and: [
        { sub },
        {
          typeOfRegistration: {
            $in: [TypeOfRegistration.E_RESIDENCY, TypeOfRegistration.RESIDENCY],
          },
        },
        {
          status: ResidentStatus.ACTIVE,
        },
      ],
    };
    const resident = await this.residentService.findByQuery(query);
    return resident === undefined;
  }

  defaultMessage(
    validationArguments?: ValidationArguments | undefined,
  ): string {
    return `${validationArguments?.property} is not a valid whatever`;
  }
}

export function IsResidencyActive(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ActiveResidencyConstraint,
    });
  };
}
