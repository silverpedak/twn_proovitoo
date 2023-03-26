// import { Injectable } from '@nestjs/common';
// import {
//   registerDecorator,
//   ValidationArguments,
//   ValidationOptions,
//   ValidatorConstraint,
//   ValidatorConstraintInterface,
// } from 'class-validator';

// import { IndustryChangeAplService } from '../industry-change-apl.service';

// @ValidatorConstraint({ async: true })
// @Injectable()
// export class ExistingApplicationConstraint
//   implements ValidatorConstraintInterface
// {
//   constructor(
//     private readonly industryChangeAplService: IndustryChangeAplService,
//   ) {}

//   async validate(residentSub: string) {
//     const resident = await this.industryChangeAplService.findByResidentSub(
//       residentSub,
//     );
//     return resident === undefined;
//   }

//   defaultMessage(
//     validationArguments?: ValidationArguments | undefined,
//   ): string {
//     return 'application already exists';
//   }
// }

// export function IsExistingApplication(validationOptions?: ValidationOptions) {
//   return function (object: object, propertyName: string) {
//     registerDecorator({
//       target: object.constructor,
//       propertyName: propertyName,
//       options: validationOptions,
//       constraints: [],
//       validator: ExistingApplicationConstraint,
//     });
//   };
// }
